const { ObjectId } = require('mongoose').Types;
const { ClimbingSession, User, Send } = require('../models');
const asyncHandler = require('express-async-handler')

// Get all climbing Sessions
const getClimbingSessions = asyncHandler(async (req, res) => {
    const climbingSession = await ClimbingSession.find({ user: req.user.id })

    res.status(200).json(climbingSession)
})
// Get a single climbing Session
const getSingleClimbingSession = asyncHandler(async (req, res) => {
    const climbingSession = await ClimbingSession.findById(req.params.id)
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (climbingSession.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    ClimbingSession.findOne({ _id: req.params.id })
        .select('-__v')
        .then((climbingSession) =>
            !climbingSession
                ? res.status(404).json({ message: 'No climbing session with that ID' })
                : res.json(climbingSession)
        )
        .catch((err) => res.status(500).json(err));
})
// Get a single climbing Session
const getClimbingSessionDate = asyncHandler(async (req, res) => {
    ClimbingSession.findOne({ createdAt: req.body.createdAt })
        .select('-__v')
        .then((climbingSession) =>
            !climbingSession
                ? res.status(404).json({ message: 'No climbing session with that date' })
                : res.json(climbingSession)
        )
        .catch((err) => res.status(500).json(err));
})
// create a new climbingSession
const createClimbingSession = asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure all the needed fields is there for the climbing session
    if (!req.body.boulderingOrSportClimbing || !req.body.durationMinutes || !req.body.numberOfSends || !req.body.indoorOutdoor || !req.body.totalAttempts || !req.body.rating) {
        res.status(400)
        throw new Error('Please add the needed fields for the climbing session; Nothing was created')
    }
    // If there are any of the needed fields to make a send then this will run
    if (req.body.actualGrade || req.body.feltGrade || req.body.sent || req.body.totalSessions) {
        // Make sure all the needed fields is there for the send
        if (!req.body.actualGrade || !req.body.totalAttempts || !req.body.feltGrade || !req.body.sent || !req.body.totalSessions) {
            res.status(400)
            throw new Error('Please add the needed fields for the send; Nothing was created')
        }
        // climbing session object create
        const climbingSession = await ClimbingSession.create({
            boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
            durationMinutes: req.body.durationMinutes,
            numberOfSends: req.body.numberOfSends,
            indoorOutdoor: req.body.indoorOutdoor,
            totalAttempts: req.body.totalAttempts,
            climbingNotes: req.body.climbingNotes,
            createdAt: req.body.createdAt,
            rating: req.body.rating,
            user: req.user.id,
        })
        // Send obj
        const sendObj = await Send.create({
            actualGrade: req.body.actualGrade,
            feltGrade: req.body.feltGrade,
            notes: req.body.notes,
            sent: req.body.sent,
            totalAttempts: req.body.totalAttempts,
            totalSessions: req.body.totalSessions,
            videoOrImg: req.body.videoOrImg,
            climbingSession: climbingSession._id.toString(),
            createdAt: req.body.createdAt,
            user: req.user.id,
        })
        // Update the climbing session with the send id
        const updatedSessions = await ClimbingSession.findByIdAndUpdate(climbingSession._id.toString(), { $addToSet: { sends: sendObj._id.toString() } }, {
            new: true,
        })
        // Update the user with the climbing session
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $addToSet: { climbingSessions: climbingSession } },
            { runValidators: true, new: true }
        );
        // Update the user with the send
        const updatedUser2 = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $addToSet: { sends: sendObj } },
            { runValidators: true, new: true }
        );
        // Response JSON the updated climbing session 
        res.status(200).json(updatedSessions)
        // console.log(climbingSession._id.toString())
    } else {
        // this will run if there is nothing for a send and just a climbing session
        // climbing session object create
        const climbingSession = await ClimbingSession.create({
            boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
            durationMinutes: req.body.durationMinutes,
            numberOfSends: req.body.numberOfSends,
            indoorOutdoor: req.body.indoorOutdoor,
            totalAttempts: req.body.totalAttempts,
            climbingNotes: req.body.climbingNotes,
            rating: req.body.rating,
            createdAt: req.body.createdAt,
            user: req.user.id,
        })
        // Update the user with the climbing session
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $addToSet: { climbingSessions: climbingSession } },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedUser)
    }
})

// update a climbing session
const updateClimbingSession = asyncHandler(async (req, res) => {
    const climbingSessionVar = await ClimbingSession.findById(req.params.id)
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (climbingSessionVar.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    // If the climbing session is being updated with a send ID make sure it exists
    if (req.body.sends) {
        const findID = await Send.findOne({ _id: req.body.sends });
        // and if the climbing session id is null meaning it doesnt exisit
        if (findID === null) {
            throw new Error(`No updates were made; Send ID doesn't exist`)
        }
    }
    const updatedsend = await Send.findByIdAndUpdate(req.body.sends, { $addToSet: { climbingSession: req.params.id } }, {
        new: true,
    })
    ClimbingSession.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((climbingSession) =>
            !climbingSession
                ? res.status(404).json({ message: 'No climbing session with this id!' })
                : res.json(climbingSession)
        )
        .catch((err) => res.status(500).json(err));
})
// Delete a climbing session
const deleteClimbingSession = asyncHandler(async (req, res) => {
    const climbingSessionVar = await ClimbingSession.findById(req.params.id)
    const findSend = await Send.find({ climbingSessions: req.params.id })
    // console.log(findSend)
    // console.log(climbingSessionVar.sends.toString())
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (climbingSessionVar.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    ClimbingSession.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json({ message: 'Climbing session deleted!' }))
        .catch((err) => res.status(500).json(err));
    const updatedUser = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $pull: { climbingSessions: req.params.id } },
        { runValidators: true, new: true }
    );
    if (climbingSessionVar.send > 0) {
        const updatedSession = await Send.findByIdAndUpdate(
            { _id: climbingSessionVar.sends.toString() },
            { $pull: { climbingSession: req.params.id } },
            { runValidators: true, new: true }
        );
    }
    // if (findSend ) {
    //     const updatedSession = await Send.findByIdAndUpdate(
    //         { _id: climbingSessionVar.sends.toString() },
    //         { $pull: { climbingSession: req.params.id } },
    //         { runValidators: true, new: true }
    //     );
    // }

    // res.status(200).json(updatedUser)
})

module.exports = {
    getClimbingSessions,
    getSingleClimbingSession,
    updateClimbingSession,
    getClimbingSessionDate,
    deleteClimbingSession,
    createClimbingSession
};

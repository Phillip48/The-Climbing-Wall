const { ObjectId } = require('mongoose').Types;
const { Send, User, ClimbingSession } = require('../models');
const asyncHandler = require('express-async-handler')

// Get all sends
const getSends = asyncHandler(async (req, res) => {
    const sends = await Send.find({ user: req.user.id })

    res.status(200).json(sends)
})
// Get a single send
const getSingleSend = asyncHandler(async (req, res) => {
    const send = await Send.findById(req.params.id)
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (send.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    Send.findOne({ _id: req.params.id })
        .select('-__v')
        .then((send) =>
            !send
                ? res.status(404).json({ message: 'No send with that ID' })
                : res.json(send)
        )
        .catch((err) => res.status(500).json(err));
})
// Get a single send
const getSendDate = asyncHandler(async (req, res) => {
    Send.find({createdAt: req.body.createdAt })
        .select('-__v')
        .then((send) =>
            !send
                ? res.status(404).json({ message: 'No send with that date' })
                : res.json(send)
        )
        .catch((err) => res.status(500).json(err));
})
// creates a send
const createSend = asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure all the needed fields is there for the send
    if (!req.body.boulderingOrSportClimbing || !req.body.indoorOutdoor || !req.body.totalAttempts || !req.body.indoorOutdoor || !req.body.sent || !req.body.totalSessions) {
        res.status(400)
        throw new Error('Please add the needed fields')
    }
    // Establish the sendObj for later use
    let sendObj = {
        boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
        indoorOutdoor: req.body.indoorOutdoor,
        boulderingActualGrade: req.body.boulderingActualGrade,
        boulderingFeltGrade: req.body.boulderingFeltGrade,
        sportClimbingActualGrade: req.body.sportClimbingActualGrade,
        sportClimbingFeltGrade: req.body.sportClimbingFeltGrade,
        notes: req.body.notes,
        sent: req.body.sent,
        totalAttempts: req.body.totalAttempts,
        totalSessions: req.body.totalSessions,
        videoOrImg: req.body.videoOrImg,
        climbingSession: req.body.climbingSession,
        createdAt: req.body.createdAt,
        user: req.user.id,
    }
    // console.log(sendObj)
    // If the user sends a climbing session id
    if (req.body.climbingSession) {
        const findID = await ClimbingSession.findOne({ _id: req.body.climbingSession });
        // and if the climbing session id is null meaning it doesnt exisit
        if (findID === null) {
            // change the sendObj to not have a climbingSession key in the variable so it doesnt get posted with an id that doesnt exisit
            sendObj = await Send.create({
                boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
                indoorOutdoor: req.body.indoorOutdoor,
                boulderingActualGrade: req.body.boulderingActualGrade,
                boulderingFeltGrade: req.body.boulderingFeltGrade,
                sportClimbingActualGrade: req.body.sportClimbingActualGrade,
                sportClimbingFeltGrade: req.body.sportClimbingFeltGrade,
                notes: req.body.notes,
                sent: req.body.sent,
                totalAttempts: req.body.totalAttempts,
                totalSessions: req.body.totalSessions,
                videoOrImg: req.body.videoOrImg,
                createdAt: req.body.createdAt,
                // climbingSession: '',
                user: req.user.id,
            })
            const updatedUser = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $addToSet: { sends: sendObj } },
                { runValidators: true, new: true }
            );
            res.status(200).json(updatedUser)
            throw new Error('Send was created however no Climbing Session was found with that ID')
        } else {
            // if theres a climbing session id and it does exisit it will run this
            sendObj = await Send.create({
                boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
                indoorOutdoor: req.body.indoorOutdoor,
                boulderingActualGrade: req.body.boulderingActualGrade,
                boulderingFeltGrade: req.body.boulderingFeltGrade,
                sportClimbingActualGrade: req.body.sportClimbingActualGrade,
                sportClimbingFeltGrade: req.body.sportClimbingFeltGrade,
                notes: req.body.notes,
                sent: req.body.sent,
                totalAttempts: req.body.totalAttempts,
                totalSessions: req.body.totalSessions,
                videoOrImg: req.body.videoOrImg,
                climbingSession: req.body.climbingSession,
                createdAt: req.body.createdAt,
                user: req.user.id,
            })
            const updatedUser = await User.findByIdAndUpdate(
                { _id: req.user.id },
                { $addToSet: { sends: sendObj } },
                { runValidators: true, new: true }
            );
            const updatedSessions = await ClimbingSession.findByIdAndUpdate(sendObj.climbingSession._id.toString(), { $addToSet: { sends: sendObj._id.toString() } }, {
                new: true,
            })
            res.status(200).json(updatedSessions)
        }
        // If there isnt a climbing session id this will run 
    } else {
        sendObj = await Send.create({
            boulderingOrSportClimbing: req.body.boulderingOrSportClimbing,
            indoorOutdoor: req.body.indoorOutdoor,
            boulderingActualGrade: req.body.boulderingActualGrade,
            boulderingFeltGrade: req.body.boulderingFeltGrade,
            sportClimbingActualGrade: req.body.sportClimbingActualGrade,
            sportClimbingFeltGrade: req.body.sportClimbingFeltGrade,
            actualGrade: req.body.actualGrade,
            feltGrade: req.body.feltGrade,
            notes: req.body.notes,
            sent: req.body.sent,
            totalAttempts: req.body.totalAttempts,
            totalSessions: req.body.totalSessions,
            videoOrImg: req.body.videoOrImg,
            createdAt: req.body.createdAt,
            user: req.user.id,
        })
        const updatedUser = await User.findByIdAndUpdate(
            { _id: req.user.id },
            { $addToSet: { sends: sendObj } },
            { runValidators: true, new: true }
        );
        res.status(200).json(updatedUser)
    }
})

// update a send
const updateSend = asyncHandler(async (req, res) => {
    const send = await Send.findById(req.params.id)
    // console.log(req.params.id)
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (send.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    // If the send is being updated with a climbing session ID make sure it exists
    if (req.body.climbingSession && !req.body.climbingSession === '') {
        const findID = await ClimbingSession.findOne({ _id: req.body.climbingSession });
        // and if the climbing session id is null meaning it doesnt exisit
        if (findID === null) {
            throw new Error(`No updates were made; Climbing session ID doesn't exist`)
        }
        // if it does update the climbing session
        const updatedSessions = await ClimbingSession.findByIdAndUpdate(req.body.climbingSession, { $addToSet: { sends: req.params.id } }, {
            new: true,
        })
    }
    Send.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((send) =>
            !send
                ? res.status(404).json({ message: 'No send with this id!' })
                : res.json(send)
        )
        .catch((err) => res.status(500).json(err));

})
// Delete a send
const deleteSend = asyncHandler(async (req, res) => {
    const send = await Send.findById(req.params.id)
    // console.log(send.climbingSession.toString())
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    // console.log(send)
    if (send.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    Send.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json({ message: 'Send deleted!' }))
        .catch((err) => res.status(500).json(err));

    const updatedUser = await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $pull: { sends: req.params.id } },
        { runValidators: true, new: true }
    );
    // Check to see if the climbing session has a send
    if (send.climbingSession > 0) {
        const updatedSession = await ClimbingSession.findByIdAndUpdate(
            { _id: send.climbingSession.toString() },
            { $pull: { sends: req.params.id } },
            { runValidators: true, new: true }
        );
    }
    // res.status(200).json(updatedUser)
})

module.exports = {
    deleteSend,
    updateSend,
    createSend,
    getSends,
    getSingleSend,
    getSendDate
};



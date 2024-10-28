// const { ObjectId } = require('mongoose').Types;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')
const { User } = require('../models/');
require('dotenv').config();


// Get all Users
// const getUsers = (req, res) => {
//     User.find()
//         .then((users) => res.json(users))
//         .catch((err) => res.status(500).json(err));

// }
// // Get a single User
// const getSingleUser = (req, res) => {
//     User.findOne({ _id: req.params.userId })
//         .select('-__v')
//         .then((user) =>
//             !user
//                 ? res.status(404).json({ message: 'No user with that ID' })
//                 : res.json(user)
//         )
//         .catch((err) => res.status(500).json(err));
// }

// Update a user (works)
const updateUser = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.userId)

    if (!user) {
        res.status(400)
        throw new Error('user not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the user user
    // console.log(user._id.toString())
    // console.log(req.user.id)
    if (user._id.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
        new: true,
    })

    res.status(200).json(updatedUser)
})

// Delete a User (works)
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.userId)
    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    // Make sure the logged in user matches
    if (user._id.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await user.remove()

    res.status(200).json({ id: req.params.userId })
})

//  sign in (works)
const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
// Register a user (works)
const register = asyncHandler(async (req, res) => {
    const { userName, firstName, lastName, email, phoneNumber, password, maxBoulderingGrade,
        maxTopRopingGrade, bio, profileImg } = req.body

    if (!userName || !maxBoulderingGrade || !maxTopRopingGrade || !firstName || !lastName || !phoneNumber || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    // Check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        userName, firstName, lastName, email, phoneNumber, password, maxBoulderingGrade,
        maxTopRopingGrade, bio, profileImg,
        password: hashedPassword,
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// 
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})


// Generate JWT (works)
const generateToken = (id) => {
    // process.env.JWT_SECRET needs to replace JWTSECRETKEY123 BUT ENV NOT WORKING
    return jwt.sign({ id }, 'JWTSECRETKEY123', {
        expiresIn: '1h',
    })
}
console.log(process.env.JWT_SECRET)
// console.log(process.env.NODE_ENV)

module.exports = {
    getMe,
    register,
    // getSingleUser,
    // getUsers,
    deleteUser,
    updateUser,
    signIn,
    getMe,
    // loginRequired,
    // profile
}
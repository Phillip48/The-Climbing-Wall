const { Schema, model } = require('mongoose');

const date = new Date;

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let format = month + '/' + day + '/' + year;
// Schema to create session model
const ClimbingSessionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        boulderingOrSportClimbing: {
            type: String,
            required: true,
        },
        durationMinutes: {
            type: Number,
            required: true,
        },
        numberOfSends: {
            type: Number,
            required: true,
        },
        indoorOutdoor: {
            type: String,
            min_length: 6,
            max_length: 7,
            required: true,
        },
        totalAttempts: {
            // Not required, Tries in total session
            type: Number,
            default: null,
        },
        climbingNotes: {
            type: String,
            default: 'No notes were made',
            max_length: 800,
        },
        rating: {
            // Out of 10
            type: Number,
            required: true,
            min: 1,
            max: 10,
        },
        sends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'send',
            },
        ],
        // projects: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'project',
        //     },
        // ],
        createdAt: {
            type: String,
            default: format
        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const ClimbingSession = model('climbingSession', ClimbingSessionSchema);

module.exports = ClimbingSession;

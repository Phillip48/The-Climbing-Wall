const { Schema, model } = require('mongoose');

const date = new Date();

let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let format = month + '/' + day + '/' + year;
// Schema to create Send model
// A probelm you sent
const sendSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        indoorOutdoor: {
            type: String,
            min_length: 6,
            max_length: 7,
            required: true,
        },
        boulderingOrSportClimbing: {
            type: String,
            required: true,
        },
        boulderingActualGrade: {
            type: String,
        },
        boulderingFeltGrade: {
            type: String,
        },
        sportClimbingActualGrade: {
            type: String,
        },
        sportClimbingFeltGrade: {
            type: String,
        },
        notes: {
            type: String,
            default: 'No notes were made',
            max_length: 800,
        },
        sent: {
            type: Boolean,
            required: true,
        },
        totalAttempts: {
            type: Number,
            required: true,
        },
        totalSessions: {
            type: Number,
            required: true,
        },
        climbingSession: [{
            type: Schema.Types.ObjectId,
            ref: 'ClimbingSession',
        }],
        createdAt: {
            type: String,
            default: format
        },
        videoOrImg:
        {
            data: Buffer,
            contentType: String
        }
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

const Send = model('send', sendSchema);

module.exports = Send;

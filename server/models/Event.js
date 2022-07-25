const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        eventTitle: {
            type: String,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        artist: {
            type: String,
        },
        user: {
            type: String,
            required: true
        },
    },
);

const Event = model('Event', eventSchema);

module.exports = Event;


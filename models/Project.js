const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    partners: {
        type: String,
        default: '-'
    },
    image: {
        type: String,
        required: true
    },
    logoOne: {
        type: String,
        required: true
    },
    logoTwo: {
        type: String,
        required: true
    },
    body: {
        type: String,
        default: '-'
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('projects', ProjectSchema);

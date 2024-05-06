const mongoose = require("mongoose")


const jobTrackerSchema = new mongoose.Schema({
    jobId: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    candidateId: {
        type: String,
        required: true,
    },
    candidateName: {
        type: String,
        required: true,
    },
    candidateNumber: {
        type: Number,
        required: true,
    },
    candidateEmail: {
        type: String,
        required: true
    },
    resumeUrl:{
        type: String,
        required: true
    },
    recruiterId: {
        type: String,
        required: true
    }
})

const jobTrackers = mongoose.model("jobTrackers", jobTrackerSchema)

module.exports = jobTrackers
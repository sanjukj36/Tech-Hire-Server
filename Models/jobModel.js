const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    jobMode: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: false,
    },
    salary: {
        type: String,
        required: false,
    },
    jobDescription: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true,
    },
    recruiterId: {
        type: String,
        required: true
    },
    

})

const jobs = mongoose.model("jobs", jobSchema)

module.exports = jobs
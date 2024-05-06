const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    auth: {
        type: String,
        required: false
    },
    companyName: {
        type: String,
        required: false
    },
    aboutCompany: {
        type: String,
        required: false
    },
    companyWebsite: {
        type: String,
        required: false
    },
    linkedIn: {
        type: String,
        required: false
    },
    companyLogo: {
        type: String,
        required: false
    },
    location:{
        type: String,
        required: false
    },
    domain:{
        type: String,
        required: false
    },
    aboutYou:{
        type: String,
        required: false
    },git:{
        type: String,
        required: false
    },linkedIn:{
        type: String,
        required: false
    },phoneNumber:{
        type: Number,
        required: false
    },place:{
        type: String,
        required: false
    },portfolio:{
        type: String,
        required: false
    },profileImage:{
        type: String,
        required: false
    },resumeUrl:{
        type: String,
        required: false
    }

})

const users = mongoose.model("users", userSchema)

module.exports = users
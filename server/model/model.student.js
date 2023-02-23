const mongoose = require('mongoose');

const Schema = mongoose.Schema


const StudentSchema = new Schema({
    name: { type: String, required: true },
    lname: { type: String, required: true }
})

const std = mongoose.model('Student', StudentSchema)

module.exports = std
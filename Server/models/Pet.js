const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    name: String,
    type: String,
    age: Number,
    description: String,
    image: String,
    vaccineDates: [String],
    medicalHistory: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Pet', petSchema);
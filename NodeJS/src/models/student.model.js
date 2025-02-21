const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rollNumber: {
        type: Number,
        required: true,
        unique: true
    },
    grade: {
        type: Number,
        required: true,
        min: 0,
        max: 100
      },
      subjects: [{
        type: String,
        trim: true
      }],
      createdAt: {
        type: Date,
        default: Date.now
      }

});

module.exports = mongoose.model('Student', studentSchema);
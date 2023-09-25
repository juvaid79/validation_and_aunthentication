const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        uniqure: true
    },
    Password: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type:Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, { timestamps: true });
const User = mongoose.model('User', UserSchema);
module.exports = User;
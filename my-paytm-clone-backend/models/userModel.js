
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
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
    upi_id: {
        type: String,
        unique: true
    },
    balance: {
        type: Number,
        default: 1000 // Initial balance set to 1000 INR
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;

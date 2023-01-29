const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
}, { timesstamps: true })
module.exports = mongoose.model('User', UserSchema);
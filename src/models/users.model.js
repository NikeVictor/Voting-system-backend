const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    phoneNumber: { type: String },
    voted: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;

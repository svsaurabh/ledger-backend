const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
});

module.exports = User = mongoose.model("user", UserSchema);

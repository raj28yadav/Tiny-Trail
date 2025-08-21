const mongoose = require("mongoose");
const { applyTimestamps } = require("./url");
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {timestamps: true}
);
const User = mongoose.model("user", userSchema);
module.exports = User;
const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const Model = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
}, {
    collection: 'users',
    timestamps: true,
    versionKey: false,
})

module.exports = mongoose.model("User", Model);
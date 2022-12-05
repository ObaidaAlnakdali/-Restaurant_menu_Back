const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const Model = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        // default: "https://via.placeholder.com/150"
    },
    active: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
}, {
    collection: 'items',
    versionKey: false,
})

Model.pre(['find', 'save'], function () {
    this.populate(['category']);
});

module.exports = mongoose.model("Item", Model);
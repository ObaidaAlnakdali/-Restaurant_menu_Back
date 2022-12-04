const mongoose = require('mongoose');
const { Schema } = require("mongoose");
const Model = new Schema({
    icon: {
        type: String,
        default: 'default_category.png'
    },
    title: {
        type: String,
        unique: true,
        required: true,
    },
}, {
    collection: 'categories',
    versionKey: false,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true }
})

// Model.pre(['find', 'findById'], function () {
//     this.populate(['items']);
// });

// Model.virtual('items', {
//     ref: 'Item',
//     localField: '_id',
//     foreignField: 'category'
// })

module.exports = mongoose.model("Category", Model);
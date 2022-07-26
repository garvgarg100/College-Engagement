const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    hashtags: {
        type: Array
    },
    upvotes: {
        type: Array
    },
    votesCount: {
        type: Number
    },
    imgurl: {
        type: String
    }
});

module.exports = mongoose.model('post', postSchema);
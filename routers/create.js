const express = require("express");
const router = express.Router();
const path = require("path");
const Post = require("../models/postSchema");
const {
    createPostPage,
    createPost
} = require(path.join(__dirname, '..', 'controllers', 'createController.js'));

router.get('/create-post', createPostPage);

router.post('/create-post', createPost);

module.exports = router;
const express = require("express");
const router = express.Router();
const path = require("path");
const { route } = require("./create");
const { isAuth } = require("../middlewares/isAuth.js");

const {
    blogs,
    notices,
    interviewExperiences,
    getSingleBlog,
    votedSingleBlog,
    getSingleNotice
} = require(path.join(__dirname, '..', 'controllers', 'postController.js'));


router.get('/blog', blogs);
router.get('/notice', isAuth, notices);
router.get('/interview-experience', interviewExperiences);
router.get('/singleblog/:id', getSingleBlog);
router.get('/singleNotice/:id', isAuth, getSingleNotice);
router.get('/singleblog/vote/:id', isAuth, votedSingleBlog);


module.exports = router;
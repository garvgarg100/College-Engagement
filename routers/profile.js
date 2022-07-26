const express = require("express");
const router = express.Router();
const path = require("path");
const {
    profile
} = require(path.join(__dirname, '..', 'controllers', 'profileController.js'));
const { isAuth } = require(path.join(__dirname, '..', 'middlewares', 'isAuth.js'))

router.get('/profile', isAuth, profile);

module.exports = router;
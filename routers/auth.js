const express = require("express");
const { dirname } = require("path");
const router = express.Router();
const path = require("path");

const {
    loginPage,
    signupPage,
    logout,
    login,
    signup
} = require(path.join(__dirname, '..', 'controllers', 'authController.js'));
const {
    isAuth
} = require(path.join(__dirname, '..', 'middlewares', 'isAuth.js'));
const {
    isNotAuth
} = require(path.join(__dirname, '..', 'middlewares', 'isNotAuth.js'));

router.get('/login', isNotAuth, loginPage);
router.get('/signup', isNotAuth, signupPage);
router.get('/logout', isAuth, logout);

router.post('/login', isNotAuth, login);
router.post('/signup', isNotAuth, signup);

module.exports = router;
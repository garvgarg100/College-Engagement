const path = require("path");
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");

module.exports.loginPage = async(req, res) => {
    try {
        const message = await req.consumeFlash('message')
        res.render("login.ejs", { message });
    } catch (err) {
        console.log(err);
    }
};

module.exports.signupPage = async(req, res) => {
    try {
        const message = await req.consumeFlash('message')
        res.render("signup.ejs", { message });
    } catch (err) {
        console.log(err);
    }
};

module.exports.logout = async(req, res) => {
    try {
        await req.session.destroy();
        res.redirect('/');
    } catch (err) {
        comsole.log(err);
    }
};


module.exports.login = async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const password = req.body.password;
            const hashedPassword = user.password;
            const result = await bcrypt.compare(password, hashedPassword);
            if (result) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.redirect('/');
            } else {
                await req.flash('message', 'Wrong Password');
                res.redirect('/login');
            }
        } else {
            await req.flash('message', "user doesn't exist");
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }

};


module.exports.signup = async(req, res) => {
    try {
        const fullName = req.body.fullName;
        const email = req.body.email;
        const password = req.body.password;
        const username = req.body.username;

        if ((!fullName || !email || !password || !username)) {
            await req.flash('message', 'All the fields are requied to be filled');
            res.redirect('/signup');
        } else if (await User.findOne({ username })) {
            await req.flash('message', 'Username alredy exists');
            res.redirect('/signup');
        } else if (await User.findOne({ email })) {
            await req.flash('message', 'Email already exists');
            res.redirect('/signup');
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);

            await User.create({
                name: fullName,
                email,
                password: hashedPassword,
                admin: true,
                username,
                posts: []
            })
            res.redirect('/login');
        }
    } catch (err) {
        console.log(err);
    }
};
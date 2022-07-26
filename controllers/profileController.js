const Post = require("../models/postSchema.js");
module.exports.profile = async(req, res) => {
    try {
        const posts = await Post.find({ author: req.session.user.username });
        res.render("profile.ejs", { user: req.session.user, posts });
    } catch (err) {
        console.log(err);
    }
};
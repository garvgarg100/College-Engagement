const path = require("path");
const Post = require("../models/postSchema");

module.exports.blogs = async(req, res) => {
    try {
        const blogs = await Post.find({ type: "Blog" });
        res.render('blogs.ejs', { blogs });
    } catch (err) {
        console.log(err);
    }

};
module.exports.notices = async(req, res) => {
    try {
        const notices = await Post.find({ type: "Notice" });
        res.render('notices.ejs', { notices });
    } catch (err) {
        console.log(err);
    }
};
module.exports.interviewExperiences = async(req, res) => {
    try {
        const interviewExperiences = await Post.find({ type: "Interview Experience" });
        console.log(interviewExperiences);
        res.render('interview-experiences.ejs', { interviewExperiences });
    } catch (err) {
        console.log(err);
    }
};

module.exports.getSingleBlog = async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Post.findById({ _id: id });
        if (blog.type == "Notice") {
            res.redirect('/');
        } else {
            res.render('singleBlog.ejs', { blog });
        }
    } catch (err) {
        console.log(err);
    }

};

module.exports.getSingleNotice = async(req, res) => {
    try {
        const id = req.params.id;
        const notice = await Post.findById({ _id: id });
        if (notice.type == "Notice") {
            res.render('singleNotice.ejs', { notice });
        } else {
            res.redirect('/');
        }
    } catch (err) {
        console.log(err);
    }

};


module.exports.votedSingleBlog = async(req, res) => {
    try {
        const id = req.params.id;
        const blog = await Post.findById({ _id: id });
        userId = req.session.user._id;
        const result = await blog.upvotes.includes(userId);
        if (result == false) {
            await blog.upvotes.push(userId);
            blog.votesCount += 1;
            await blog.save();

        } else {
            for (let i = 0; i < blog.upvotes.length; ++i) {
                if (blog.upvotes[i].toString() == userId.toString()) {
                    await blog.upvotes.splice(i, 1);
                    break;
                }
            }
            blog.votesCount -= 1;
            await blog.save();
        }
        let data = await JSON.stringify({ upvote: blog.votesCount })
        res.send(data);
    } catch (err) {
        console.log(err);
    }

};
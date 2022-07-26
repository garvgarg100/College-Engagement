const path = require("path");
const Post = require("../models/postSchema");

module.exports.createPostPage = (req, res) => {
    res.render(path.join(__dirname, '..', 'views', 'create-post.ejs'));
};

module.exports.createPost = async(req, res) => {
    try {

        let type = req.body.gridRadios;
        let { content, title, imgurl } = req.body;

        let hashtags = req.body.content.split(' ').filter(s => s.startsWith('#'));

        let postData = new Post({
            title,
            content,
            type,
            author: req.session.user.username,
            upvotes: [],
            votesCount: 0,
            date: new Date(),
            hashtags,
            imgurl
        });

        const post = await postData.save();
        res.redirect('/blog');
    } catch (err) {
        console.log(err);
    }
}
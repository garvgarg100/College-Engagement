const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { flash } = require("express-flash-message")
var csrf = require('csurf')

const MONGODB_URL = "mongodb://localhost:27017/CollegeApp";


const create = require("./routers/create.js");
const post = require("./routers/post.js");
const profile = require("./routers/profile.js");
const search = require("./routers/search.js");
const auth = require("./routers/auth.js");
const store = new MongoDBStore({ uri: MONGODB_URL, collection: 'sessions' })


let csrfProtection = csrf();
app.use(bodyParser.urlencoded({ extended: false })); //Body parser syntax
app.use(express.static(path.join(__dirname, "public"))); //Set public folder as static, so that we can give its access to user, and we can also access it directly in vuews
app.set("view-engine", "ejs");
app.use(session({ secret: "my secret", resave: false, saveUninitialized: false, store: store }));
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use(csrfProtection);



app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    if (req.session.user) {
        res.locals.username = req.session.user.username;
        res.locals.admin = req.session.user.admin;
    } else {
        res.locals.username = null;
        res.locals.admin = null;
    }
    if (!res.locals.message) {
        res.locals.message = null;
    }
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(auth);
app.use(create);
app.use(post);
app.use(profile);
// app.use(search);


app.get("/", (req, res) => {
    res.render("home.ejs");
});


app.listen(3000, () => {
    console.log("listening on port 3000");
});

mongoose.connect(MONGODB_URL, () => {
    console.log("connected to database");
});
const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors")
const passport = require("passport")
const passportLocal = require("passport-local")
const cookieParser = require("cookie-parser")
const bcrypt = require("bcrypt")
const session = require("express-session")

const app = express();
const User = require("./user");

mongoose.connect("mongodb://127.0.0.1:27017/user", { useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log("DB connected");
})
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: "http://localhost:3000", //host of client
    credentials:true
}));
app.use(cookieParser("secretcode"));
app.use(session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,

}))
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

//routes

app.post("/register", (req, res) => {
    console.log(req.body)
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if(doc) {
            res.send("User exists");
            console.log("User exists");
        }
        if(!doc){
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                username: req.body.username,
                password: hashPassword
            })
            await newUser.save();
            res.send("user created");
            console.log("User created");
        }
    })
})
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) throw err;
        if(!user) res.send("No user exists");
        else {
            req.logIn(user, (err) => {
                if(err) throw err;
                res.send("Successfully authenticated");
                console.log("Successfully authenticated");
            })
        }
    })(req, res, next);
})
app.get("/getUser", (req, res) => {
    res.send(req.user)
    console.log(req.user);
})
//start server
app.listen(4000, () => {
    console.log("Listening on 4000 ...")
})
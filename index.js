const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override');
const { log } = require("console");

app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));


const posts = [
    {
        id: uuidv4(),
        username: "sagar",
        content: "the name is sagar "

    },
    {
        id: uuidv4(),
        username: "sushil",
        content: "welcome sir "

    },
    {
        id: uuidv4(),
        username: "mr_dad_w3h__",
        content: "hello sir i am your assistent"

    }
]


app.get("/posts", (req, res) => {
    res.render("post.ejs", { posts });
})
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
})
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    res.render("show.ejs", { post });
})
// app.get("/posts/:id/edit", (req, res) => {
//     let { id } = req.params;
//     let post = posts.find((p) => id == p.id);
//     res.render("edit.ejs", { post });
// })
app.patch('/posts/:id', (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id == p.id);
    let newContent = req.body.content
    post.content = newContent
    console.log(post,"patch re");
    // res.redirect("post.ejs")



})

app.post("/posts/", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content })
    res.redirect('/posts')


})


app.listen(port, () => {
    console.log(`your server is listeing on port ${port}`);

})



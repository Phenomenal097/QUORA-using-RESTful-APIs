const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set("view engine", "ejs"); //set ejs
app.set("views", path.join(__dirname,"views")); //set path with views dir

app.use(express.static(path.join(__dirname,"public"))); // set path with public dir
app.use(express.urlencoded({extended : true})); // to use post req data in body......

const port = 8080;

let posts = [
    {
        id : uuidv4(),
        username : "Shantanu Jha",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "Ramesh",
        content : "hardwork is key to success"
    },
    {
        id : uuidv4(),
        username : "Suresh",
        content : "live life full size"
    }
];

app.get("/posts", (req,res) => {  
    res.render("index.ejs", {posts})
})

app.get("/posts/new", (req,res) =>{
    res.render("new.ejs");
})

//Create route
app.post("/posts", (req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); //By default to get request only...
})

//View Route
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
})

//Update route
app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

//Edit route
app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

//Delete route
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

app.listen(port, () => {
    console.log("Listening at port 8080");
})



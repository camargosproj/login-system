const express = require("express");

const blogRoute = express.Router();

blogRoute.get("/blogs", (req, res) => {
    res.json({ message: "Blog route" });
});

blogRoute.get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    res.json({message: "Blog route for id: " + id});
});

blogRoute.post("/blogs", (req, res) => {
    res.json({message: "Blog post created"});
});

module.exports = {blogRoute};


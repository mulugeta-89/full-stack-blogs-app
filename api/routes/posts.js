const express = require("express");
const {getPost, getPosts, addPost, updatePost, deletePost} = require("../controllers/postController")

const postRouter = express.Router()

postRouter.get("/", getPosts)
postRouter.get("/:id", getPost)
postRouter.post("/", addPost)
postRouter.delete("/:id", deletePost)
postRouter.put("/:id", updatePost)

module.exports = postRouter;
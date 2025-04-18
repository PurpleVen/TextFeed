const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); //import db

router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); //fetch records
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/posts', async (req, res) => {
  const { message, user } = req.body; //extract them
  try {
    const newPost = new Post({ user, message, comments: [] }); //create 
    await newPost.save(); //save
    res.json(newPost);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/posts/:postId/comment', async (req, res) => {
  const { postId } = req.params; //unique id to attach comments to
  const { message, user } = req.body; //extract them
  try {
    const post = await Post.findById(postId); //find by unique id
    if (!post) return res.status(404).send('Post not found');
    post.comments.push({ user, message }); //new comment
    await post.save(); //save
    res.json(post);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.get('/posts/search', async (req, res) => {
  const query = req.query.q; //extract q
  try {
    const posts = await Post.find({
      $or: [
        { message: { $regex: query, $options: 'i' } }, //case-insensitive
        { 'comments.message': { $regex: query, $options: 'i' } },
      ],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
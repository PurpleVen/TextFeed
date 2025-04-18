const mongoose = require('mongoose');
// create functions
//for comment to have name and the message
const CommentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });

//for the post to have the name, message posted and the comment (array) for multiple comments
const PostSchema = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true },
  comments: [CommentSchema],
}, { timestamps: true });

//export them
module.exports = mongoose.model('Post', PostSchema);
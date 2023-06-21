const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  user: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
})

CommentSchema.index({ comment: 1, user: 1 }, { unique: true })

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
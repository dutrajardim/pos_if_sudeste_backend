const bcrypt = require('bcrypt')
const User = require("../model/user")
const Comment = require('../model/comment')

class BadRequestError extends Error {
  constructor(msg) { super(msg) }
}

module.exports = {

  async save(req, res) {
    try {
      const { comment, email, password } = req.body

      if (!comment || !email || !password)
        throw new BadRequestError("Fields comment, email and password are required!")

      let passwordDecoded = Buffer.from(password, 'base64').toString('ascii')

      const userDoc = await User.findOne({ email })

      if (!userDoc)
        throw new BadRequestError("User not found!")

      const passwordMatch = await bcrypt.compare(passwordDecoded, userDoc.password)

      if (!passwordMatch)
        throw new BadRequestError("Password does not match!")

      const commentDoc = new Comment({
        comment,
        user: {
          email: userDoc.email,
          name: userDoc.name
        }
      })

      const savedDoc = await commentDoc.save()

      return res.status(200).json(savedDoc)

    }
    catch (error) {
      console.error(error.message)

      if (error?.code == 11000)
        return res.status(400).json({
          message: "Comentário já existe!"
        })

      if (error instanceof BadRequestError)
        return res.status(400).json({
          message: error.message
        })

      return res.status(500).json({
        message: "Internal server error! Try again later."
      })
    }
  },

  async list(_, res) {
    try {
      const comments = await Comment.find({})
      res.status(200).json(comments)
    }
    catch (error) {
      console.error(error.message)

      return res.status(500).json({
        message: "Internal server error! Try again later."
      })
    }
  }
}
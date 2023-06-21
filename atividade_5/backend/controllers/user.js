const bcrypt = require('bcrypt')
const User = require("../model/user")

class BadRequestError extends Error {
  constructor(msg) { super(msg) }
}

module.exports = {

  async save(req, res) {
    try {
      const { name, email, password, username } = req.body

      if (!name || !email || !password)
        throw new BadRequestError("Fields name, email and password are required!")

      let passwordDecoded = Buffer.from(password, 'base64').toString('ascii')

      const user = new User({
        name,
        email,
        password: await bcrypt.hash(passwordDecoded, 10),
        username
      })

      const doc = await user.save()

      return res.status(200).json({ ...doc._doc, password: undefined })

    }
    catch (error) {
      console.error(error.message)

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
      const users = await User.find({}).select('-password')
      res.status(200).json(users)
    }
    catch (error) {
      console.error(error.message)

      return res.status(500).json({
        message: "Internal server error! Try again later."
      })
    }
  }
}
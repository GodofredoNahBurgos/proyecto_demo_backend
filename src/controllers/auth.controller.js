const { registerUser, loginUser } = require('../services/auth.service')

exports.register = async (req, res) => {
  const { email, password } = req.body
  const user = await registerUser(email, password)
  res.status(201).json({ message: 'user created', userId: user._id })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const token = await loginUser(email, password)

  if (!token) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  res.json({ token })
}

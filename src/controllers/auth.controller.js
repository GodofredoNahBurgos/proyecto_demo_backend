const { registerUser, loginUser, refreshAccessToken } = require('../services/auth.service')

exports.register = async (req, res) => {
  const { email, password } = req.body
  const user = await registerUser(email, password)
  res.status(201).json({ message: 'user created', userId: user._id })
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  const tokens = await loginUser(email, password)

  if (!tokens) {
    return res.status(401).json({ error: 'invalid credentials' })
  }

  res.json(tokens)
}

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body

  const newAccessToken = await refreshAccessToken(refreshToken)

  if (!newAccessToken) {
    return res.status(401).json({ error: 'invalid refresh token' })
  }

  res.json({ accessToken: newAccessToken })
}
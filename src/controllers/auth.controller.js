const { registerUser, loginUser, refreshAccessToken } = require('../services/auth.service')

exports.register = async (req, res) => {
  
  try {
    
    const { email, password, role } = req.body
    const user = await registerUser(email, password, role)

    res.status(201).json({
      message: 'user created',
      userId: user._id
    })

  } catch (err) {

    if (err.message === 'USER_EXISTS') {
      return res.status(409).json({
        error: 'user already exists'
      })
    }

    console.error(err)
    res.status(500).json({
      error: 'internal server error'
    })

  }
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
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.registerUser = async (email, password, role) => {
  const exists = await User.findOne({ email })
  if (exists) {
    throw new Error('USER_EXISTS')
  }

  const hashed = await bcrypt.hash(password, 10)

  const data = {
    email,
    password: hashed
  }

  if (role) {
    data.role = role
  }

  const user = await User.create(data)

  return user
}

exports.loginUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) return null

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return null

  const accessToken = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: '15min' }
  )

  const refreshToken = jwt.sign(
    { id: user._id, },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  user.refreshToken = refreshToken

  await user.save()

  return { accessToken, refreshToken }

}

exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null

  const user = await User.findOne({ refreshToken })
  if (!user) return null

  try {

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

    const newAccessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '15m' }
    )

    return newAccessToken

  } catch {

    return null
    
  }
}


/* Para conectar con la base de datos */
const mongoose = require('mongoose')

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('DB connected')
  } catch (err) {
    console.error('DB error', err)
    process.exit(1)
  }
}

module.exports = connectDB
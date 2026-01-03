/* Express para crear el servidor */
const express = require('express')
/* CORS */
const cors = require('cors')
/* Rutas */
const router = express.Router()
const authRoutes = require('./routes/auth.routes')
const healthRoutes = require('./routes/health')
const privateRoutes = require('./routes/private.routes')
/* Para crear el servidor */
const app = express()
/* Para parsear el body */
app.use(express.json())
/* Para configurar CORS */
app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api', privateRoutes)

module.exports = app

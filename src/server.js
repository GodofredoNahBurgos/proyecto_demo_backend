/* Para configurar las variables de entorno */
require('dotenv').config()
/* Para configurar el servidor */
const app = require('./app')
/* Para conectar con la base de datos */
const connectDB = require('./config/db')
connectDB()

/* Para levantar el servidor */
app.listen(process.env.PORT, () => {
  console.log('server up')
})
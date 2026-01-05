# Proyecto MERN Auth API

Backend y frontend de autenticación usando **Node.js, Express, MongoDB, JWT y React**.  
Incluye login real, access token + refresh token, rotación automática, roles y rutas protegidas.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- JWT (access / refresh)
- React 18 + Vite
- Axios (interceptors)

## Funcionalidades
- Registro de usuarios
- Login con JWT
- Access Token de corta duración
- Refresh Token con rotación
- Middleware de autenticación
- Roles (`user`, `admin`)
- Guards por rol
- Frontend con protección de rutas

## Estructura (resumen)
```
backend/
 ├─ src/
 │  ├─ controllers/
 │  ├─ services/
 │  ├─ models/
 │  ├─ middleware/
 │  ├─ routes/
 │  └─ app.js
frontend/
 └─ src/
    ├─ auth/
    ├─ api/
    ├─ pages/
    └─ routes/
```

## Variables de entorno (backend)
```
PORT=3000
MONGO_URI=...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
```

## Uso
```bash
# backend
npm install
npm start

# frontend
npm install
npm run dev
```

## Notas
- El rol se asigna desde el backend.
- El refresh token se almacena en la base de datos.
- Las rutas admin están protegidas por rol.

Proyecto creado con fines de aprendizaje y práctica profesional.
// servidor/app.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas y dominios
app.use(cors());

// Si solo quieres permitir un origen específico, puedes hacerlo así:
// app.use(cors({ origin: 'http://localhost:3001' })); // Usa la URL de tu frontend

app.get('/', (req, res) => {
  res.send('hola cliente');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

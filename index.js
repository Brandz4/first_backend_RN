// index.js

const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3000;

const connection = mysql.createConnection({
  host: '34.125.97.108',
  user: 'admin',
  password: '1234',
  database: 'alumnos'
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida');
});

app.use(express.json());

app.post('/login', (req, res) => {
  const { expediente, contr } = req.body;
  
  const queryString = 'SELECT * FROM usuarios WHERE expediente = ? AND contraseña = ?';
  connection.query(queryString, [expediente, contr], (err, results) => {
    if (err) {
      console.error('Error al verificar las credenciales:', err);
      res.status(500).json({ success: false, message: 'Error al verificar las credenciales' });
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend en ejecución en el puerto ${PORT}`);
});

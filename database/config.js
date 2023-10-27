const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "database-1.cskgvkq4bmrj.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "admin123",
  database: "University",
});

db.connect(function (err) {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('DATABASE CONNECTED!');
});


module.exports = db;
const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const mysql = require('mysql');
const hbs = require('express-hbs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd'
});

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// Définir le helper formatDate
hbs.registerHelper('formatDate', function (date) {
  // Ajoutez ici votre logique pour formater la date comme vous le souhaitez
  return date;
});

connection.connect();

app.get("/", (req, res) => {
  connection.query('SELECT * FROM actualite', (error, results, fields) => {
    if (error) throw error;
    res.render('index', { actualites: results });
  });
});

app.get("/add", (req, res) => {
  res.render('add');
});

app.get("/addnews", (req, res) => {
  const untitre = req.query.letitre;
  const unedesc = req.query.ladescription;
  const sql = "INSERT INTO actualite (titre, description,date) VALUES (?, ?)";
  
  connection.query(sql, [untitre, unedesc], (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

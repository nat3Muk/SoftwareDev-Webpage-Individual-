const express = require('express');
const app = express();
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { query } = require('express');

// database configuration, config in env
const dbConfig = {
    host: "db",
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
};

const db = pgp(dbConfig);

// test your database
db.connect()
    .then((obj) => {
        console.log("Database connection successful"); // you can view this message in the docker compose logs
        obj.done(); // success, release the connection;
    })
    .catch((error) => {
        console.log("ERROR:", error.message || error);
    });

app.set("view engine", "ejs");

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", (req,res) => {
    res.render("pages/main")
});

app.get("/main", (req,res) => {
    res.render("pages/main", {
        sent: false,
    });
});
 

app.post('/search', function(req,res){
  var url =  'https://itunes.apple.com/search?';
  //initializing other parameter keys
  $.ajax({
      type        : 'GET',
      url         :  url,
      data: $('#target').serialize(),
      dataType    : 'json',
      success: function(data){
          alert('successful');
      }
  });
  });

app.get("/review", (req,res) => {
    res.render("pages/review")
});

app.listen(3000);
console.log('Server is listening on port 3000')


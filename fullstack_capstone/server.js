const express = require('express');
const morgan = require('morgan');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
const PORT = 6500;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'travels'
    }
);

db.connect((err) => {
    if(err) {
        throw err;
    }
    console.log('Successful MySQL Database Connection');
});

// POST
app.post("/post", (req, res) => {
  let sql = "INSERT INTO travels SET ?";
  let post = {
        landmark: req.body.landmark,
        city: req.body.city,
        country: req.body.country,
        hotel: req.body.hotel
  };
  db.query(sql, post, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result)
  });
});

// GET
app.get("/get", (req, res) => {
  let sqlSelect = "SELECT * FROM travels;";
  db.query(sqlSelect, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

// PUT
app.put("/edit/:id", (req, res) => {
  let updateLandmark = req.body.landmark;
  let updateCity = req.body.city;
  let updateCountry = req.body.country;
  let updateHotel = req.body.hotel;
  let sql = `UPDATE travels SET 
  landmark = '${updateLandmark}',
  city = '${updateCity}',
  country = '${updateCountry}',
  hotel = '${updateHotel}'
      WHERE id = '${req.params.id}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send(result);
  });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  let sql = `DELETE FROM travels WHERE id = '${req.params.id}'`
  db.query(sql, (err, result) => {
      if(err){
          throw (err);
      }
      console.log(result);
      return res.send("Travel Desination has been successfully removed")
  });
});

// Error Handling
app.use((err, req, res, next) => {
    return res.send({errMsg: err.message});
});

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
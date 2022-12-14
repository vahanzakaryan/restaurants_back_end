const express = require("express");

const app = express();

const mysql = require("mysql");

const cors = require("cors");

app.use(cors());

app.use(express.json())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root123",
    database: "restaurants_schema"
})

db.connect(function(err) {
    if(err) 
        throw err;
    console.log("Connected!");
  });

app.post('/postData', (req, res) => {
    const {title, description, ratings, geolocation} = req.body;
    db.query(
        "INSERT INTO restaurants (title, description, ratings, geolocation) VALUES (?, ?, ?, ?)",
        [title, description, ratings, geolocation],
       (err, result) => {
        console.log(result);
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
       }  
    );
})

app.post('/updateRating', (req, res) => {
    const {id, ratings} = req.body;
    db.query(
        "UPDATE restaurants SET ratings = ? WHERE (id = ?)",
        [ratings, id],
       (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Values inserted!");
        }
       }  
    );
})

app.get('/getData', (req, res) => {
    db.query(
        "SELECT * FROM restaurants", (err, result) => {
            if(err) 
                console.log(err)
            else 
                res.send(result)
        }
    )
})

app.post('/getData/restaurant', (req, res) => {
    const {id} = req.body;
    console.log(id);
    db.query(
        "SELECT * FROM restaurants WHERE (id = ?)",
        [id],
       (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
       }  
    );
})

app.get('/getData/restaurant', (req, res) => {
    const {id} = req.body;
    console.log(req.body);
    db.query(
        "SELECT * FROM restaurants WHERE (id = ?)",
        [id],
        (err, result) => {
            if(err) 
                console.log(err)
            else 
                res.send(result)
        }
    )
})

app.listen(3001, () => {
    console.log("Server is running");
})
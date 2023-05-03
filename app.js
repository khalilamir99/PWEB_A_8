const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');


dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USER,
    password:  process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

//Parse URL-endcoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended:false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());


app.set("view engine", "hbs");

db.connect( (error) => {
    if(error) {
        console.log(error)
    }else {
        console.log("MYSQL Connected...")
    }
})

app.get('/form', function (req, res) {
    const sql = "SELECT * FROM form";
    db.query(sql, (err,result)=>{
      const form = JSON.parse(JSON.stringify(result));
      res.send(form)
    })
  })
  
  app.get('/tambahForm', function (req, res) {
    const insertSql = "INSERT INTO form (judul, deskripsi, created_at, updated_at) VALUES (?, ?, now(), now())";
    db.query(insertSql,['Tugas PWeb','Buatlah query untuk melakukan update'], (err,rows,result)=>{
       
    let response = {
      msg : "Data berhasil ditambahkan",
      lastId : rows.insertId,
      error : err
    }
    res.send(response);
    })
    
  })
  
  app.get('/editForm', function (req, res) {
    db.query('UPDATE form SET judul = ?, deskripsi = ?, password = ? WHERE id = ?', [judul, deskripsi], (error, result) => {
       
    let response = {
      msg : "Data berhasil diedit",
      lastId : rows.insertId,
      error : err
    }
    res.send(response);
    })
    
  })

//Define Routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(8080, () => {
    console.log("Server started on Port 8080")
});

app.get('/form', function (req, res) {
    const sql = "SELECT * FROM form";
    db.query(sql, (err,result)=>{
      const form = JSON.parse(JSON.stringify(result));
      res.send(form)
    })
  })
  
  app.get('/tambahForm', function (req, res) {
    const insertSql = "INSERT INTO form (judul, deskripsi, created_at, updated_at) VALUES (?, ?, now(), now())";
    db.query(insertSql,['Tugas PWeb','Buatlah query untuk melakukan update'], (err,rows,result)=>{
       
    let response = {
      msg : "Data berhasil ditambahkan",
      lastId : rows.insertId,
      error : err
    }
    res.send(response);
    })
    
  })
  
  app.get('/editForm', function (req, res) {
    db.query('UPDATE form SET judul = ?, deskripsi = ?, password = ? WHERE id = ?', [judul, deskripsi], (error, result) => {
       
    let response = {
      msg : "Data berhasil diedit",
      lastId : rows.insertId,
      error : err
    }
    res.send(response);
    })
    
  })
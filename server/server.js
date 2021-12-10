const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "datasystem",
})

app.post('/create', (req, res) => {
  const name = req.body.name;
  const job = req.body.job;
  const age = req.body.age;

  db.query(
    "INSERT INTO datas (name, job, age) VALUES (?,?,?)",
    [name, job, age],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
})

app.get('/data', (req, res) => {
  db.query(
    'SELECT * FROM datas', 
    (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}) 

app.put('/update', (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  db.query(
    "UPDATE SET datas name = ? id = ?", 
    [id, name] , 
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        req.send(result)
      }
    })
})

app.listen(3001, () => {
  console.log("port 3001 run");
});
const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
const methodOverride = require('method-override');
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(methodOverride('_method')); // Allows PATCH requests via forms
const connection =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password : '2003',
});
// Inserting new data
let q = "INSERT INTO user (id, username, email, password) VALUES ?";


let getRandomUser = ()=> {
    return [
       faker.string.uuid(),
       faker.internet.username(), 
       faker.internet.email(),
       faker.internet.password(),
];
  }
 
  let data = [];
  for(let i= 1; i<=100;i++){
    data.push(getRandomUser());   //100 fake random users
  }
  //---------------------
 
  // home route
app.get("/", (req,res)=>{
  let q = `SELECT COUNT(*) FROM user`;
  try {
    connection.query(q, [data], (err,result)=>{
      if(err) throw err;
      let count = result[0] ["COUNT(*)"]
      res.render("home.ejs",{count});
    })
  }catch(err) {
    console.log(err);
    res.send('some error in DB')
  }
});
app.listen("8080",()=>{
  console.log("listen to port no 8080");
});

// show route
app.get('/user', (req,res)=>{
  let q = 'SELECT * FROM  user';
  try {
    connection.query(q, [data], (err,users)=>{
      if(err) throw err;
     
      // res.send(result);
      res.render('showusers.ejs',{users});
    });
  }catch(err) {
    console.log(err);
    res.send('some error in DB')
  }
});

// Edit route
app.get('/user/:id/edit',(req,res)=>{
  let {id}= req.params;
  let q =`SELECT * FROM user WHERE ID ='${id}'`;
  
  try {
    connection.query(q, [data], (err,result)=>{
      if(err) throw err;
      let user = result[0];
      res.render('edit.ejs',{user});
    });
  }catch(err) {
    console.log(err);
    res.send('some error in DB')
  }

});

// Update route
app.patch('/user/:id',(req,res)=>{
  let {id}= req.params;
  let {password:formPass, username: newUsername}=req.body;
  let q =`SELECT * FROM user WHERE ID ='${id}'`;
  
  try {
    connection.query(q, (err,result)=>{
      if(err) throw err;
      let user = result[0];
      if(formPass !=user.password){
        res.send('Wrong password');
      }else {
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          res.redirect('/user');
        });
      }
     
    });
  }catch(err) {
    console.log(err);
    res.send('some error in DB')
  }
  
});

// 🟢 Render Forms for Add & Delete User
app.get('/addUser', (req, res) => res.render('addUser'));
app.get('/deleteUser', (req, res) => res.render('deleteUser'));

// 🟢 Add New User
app.post('/user', (req, res) => {
  let { id, username, email, password } = req.body;
  let q = `INSERT INTO user (id, username, email, password) VALUES (?, ?, ?, ?)`;

  connection.query(q, [id, username, email, password], (err, result) => {
      if (err) return res.send("Error: " + err.message);
      res.redirect('/');
  });
});

// Delete route
app.post('/user/delete', (req, res) => {
  let { email, password } = req.body;

  let checkUserQuery = `SELECT * FROM user WHERE email = ?`;
  
  connection.query(checkUserQuery, [email], (err, result) => {
    if (err) {
      console.log("Database error:", err);
      return res.send('Database error');
    }

    console.log("Result from DB:", result);  // Debugging line

    if (result.length === 0) {
      console.log("No user found with this email.");
      return res.send('Invalid email or password!');
    }

    let user = result[0];

    console.log("Entered password:", password);
    console.log("Stored password:", user.password);

    if (user.password !== password) {
      console.log("Password mismatch!");
      return res.send('Invalid email or password!');
    }

    let deleteQuery = `DELETE FROM user WHERE email = ?`;
    
    connection.query(deleteQuery, [email], (err, deleteResult) => {
      if (err) {
        console.log("Error while deleting user:", err);
        return res.send('Error while deleting user');
      }

      res.send(`
        <h2>User successfully deleted</h2>
        <button onclick="window.location.href='/'">Back to Home</button>
      `);
    });
  });
});

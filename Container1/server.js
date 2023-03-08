'use strict';

//Constants
const PORT = 8080;
const HOST = '0.0.0.0';

//Imports
const express = require('express');
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');
const account = require('./key.json');
let db;

app.use(express.json());
app.use(cors());

//Initialize Firestore
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(account)
  })
  db = admin.firestore();
}

//Register method
app.post('/register', (req, res) => {
  const body = req.body;
  console.log(body)
  db.collection('users')
  .doc(body["email"])
  .get()
  .then(doc =>{
    if(!doc.exists){
      db.collection('users')
        .doc(body["email"])
        .set(body)
        .then(
          console.log('Done')
        ).catch(err => {
          console.log(err)
          return res.status(500)
          .json({
            message: 'Internal Server Error',
            success: false
          })
        });
    } else{
      res.status(403).json({
        message: 'user exists',
        status: false
      })
    }
  })
  
  return res.status(200).json({
    message: "successMessage",
    success: true,
  });
});


require('dotenv').config();
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

'use strict';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

const express = require('express');
const app = express();
const cors = require('cors');
const admin = require('firebase-admin');
const account = require('./key.json');
let db;

app.use(express.json());
app.use(cors());


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(account)
  })
  db = admin.firestore();
}

app.post('/login/', (req, res) => {
  const body = req.body;
    if (
      !(Object.keys(body).length === 2) ||
      !body.hasOwnProperty("email") ||
      !body.hasOwnProperty("password")
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid request!",
      });
    }

  db.collection('users')
  .doc(body["email"])
  .get()
  .then(doc =>{
    if(!doc.exists){
      return res.status(404)
      .json({
        message: 'User does not exists!',
        success: false
      })
    } else {
      if(doc.data().password == body["password"]){
        const FieldValue = admin.firestore.FieldValue;
        db.collection('userState').doc(body["email"]).set({
          status: 'online', 
          timestamp: FieldValue.serverTimestamp()
        })
        return res.status(200)
        .json({
          message: 'logged in',
          success: true
        })
      } else {
        return res.status(202)
        .json({
          message: 'Invalid credentials',
          success: false
        })
      }
    }
  }).catch(err => {
    console.log(err)
    return res.status(500)
    .json({
      message: 'Internal Server Error',
      success: false
    })
  })
});


require('dotenv').config();
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

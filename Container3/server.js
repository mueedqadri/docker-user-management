'use strict';

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

app.get('/allUsers', (req, res) => {  
  let onlineUsers = [];
  db.collectionGroup('userState').get().then(snapshot =>{
    snapshot.forEach(doc => {
      if(doc.data().status == 'online'){
        onlineUsers.push(doc.id)
      }
    })
    return res.status(200).json({
      message: 'Users found',
      success: true,
      data: onlineUsers
    })
  }).catch(err => {
    console.log(err)
    return res.status(500)
    .json({
      message: 'Internal Server Error',
      success: false
    })
  });
});

app.put('/logout',async (req, res)=>{
  const username = req.body.username;
  if(username){
    const FieldValue = admin.firestore.FieldValue;
    const userState = db.collection('userState').doc(username);
  
    const resDatabase = await userState.update({
      status: 'offline', 
      timestamp: FieldValue.serverTimestamp()
    }).catch(err => {
      console.log(err)
      return res.status(500)
      .json({
        message: 'Internal Server Error',
        success: false
      })
    });
    if(resDatabase){
      res.status(200).json({
        message: 'Logged out!', 
        success: true
      })
    }
  } else {
    res.status(403).json({
      success: false, 
      message: 'Bad Request'
    })
  }
})

require('dotenv').config();
app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);
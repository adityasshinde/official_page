const express = require("express");
const path=require("path");
const app= express();
const bodyparser=require("body-parser");
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/communityReply');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
} 

const port=80;

//Define Mongoose schema
const communitySchema = new mongoose.Schema({
  reply: String
});
const Community = mongoose.model('Community',communitySchema);


//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));//For serving static 
app.use(express.urlencoded());//For using data entered by user 

//Get Request Method
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });
//Get Request Method
app.get('/community', function(req, res) {
    res.sendFile(path.join(__dirname, '/community.html'));
  });
  
  //Post Request Method
  app.post('/community', (req, res)=>{
    var myData = new Community(req.body);
    myData.save().then(()=>{
    res.send(" THANK YOU FOR REPLYING !!! Your Reply has been successfully received.");
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse");
  })
  });
  
  //START THE SERVER
   app.listen(port, ()=>{
       console.log(`The application started successfully on ${port}`);
   });
  
  
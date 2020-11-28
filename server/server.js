require('./config/config'); //configuracion del server

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
app.use( require('./routes/usuario'));
// parse application/json
app.use(bodyParser.json())


mongoose.connect('mongodb+srv://koke:jtwFW3Dc4piqN90P@cluster0.bvxls.mongodb.net/cafe', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (err,res)=>
{
    if ( err ) throw err;

    console.log("base de datos online")
});



app.listen(process.env.Port, ()=> {
    console.log('escuchando puerto', process.env.Port);
});
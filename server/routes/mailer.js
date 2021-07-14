const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Usuario = require('../models/usuarios');
const {verificaTokenMail} = require('../middlewares/autenticacion');//

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
}); 

app.post('/send_verify',async (req,res)=>{
    let body = req.body;
    console.log(body);
    if(!body.email){
        return res.json({
            ok:false
        })
    }
    let token = jwt.sign({
        usuario: body.user,
        email: body.email
    },process.env.SEED_MAIL,{
        expiresIn: process.env.CADUCIDAD_TOKEN
    }
    );

    // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_USER, // sender address
    to: body.email, // list of receivers
    subject: "test nodemailer", // Subject line
    text: process.env.WIRIN+'#/verify?token='+token, // plain text body
   
  },(err)=>{
      if(err){
          return res.status(500).json({
            message:err.message,
            ok:false
          })
      }else{
        return res.json({
            ok:true,
            token: token
        })
      }
  });

  

})
app.get('/verify_mail',verificaTokenMail, (req,res)=>{
console.log(req.email)
Usuario.findOneAndUpdate({email:req.email},{verify:true},{new: true},(err,usuarioDB,)=>{
    if(err){
        return res.status(400).json({
            ok:false,
            err
        });
    }
    if(!usuarioDB){
        return res.status(400).json({
            ok:false,
            message:"email no registrado"
        });
    }else{
        return res.json({
            nombre: usuarioDB.nombre,
            verify:usuarioDB.verify,
            ok:true
        });
    }
    
    
});

})
app.post('/forgot_password',(req,res)=>{

})
module.exports=app;
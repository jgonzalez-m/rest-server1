const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
const app = express();
const _ = require('underscore');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post('/login', (req,res)=>{
    let body = _.pick(req.body,['email','password']); //controlo las datos que se pueden modificar
    //let body = req.body;
    console.log(body)
    console.log(body.email);
    console.log(body.password);
    Usuario.findOne({email: body.email},(err,usuarioDB)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: '(usuario) o contraseña incorrectos',
                    idErr:1
                },
                
            });
        };

        if( !bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok:false,
                err:{
                    message: '(contraseña) incorrectos',
                    idErr:"2"
                }
            });
        };
        let token = jwt.sign({
            usuario: usuarioDB
        },process.env.SEED,{
            expiresIn: process.env.CADUCIDAD_TOKEN
        }
        );
        res.json({
            ok:true,
            Usuario: usuarioDB,
            token
            
        });
    });
    
    
});






module.exports = app;
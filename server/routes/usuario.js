const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios')
const {verificaToken, verificaAdmin_Role} = require('../middlewares/autenticacion');//en {} se importa la funcion especifica
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));



app.get('/usuario', verificaToken, (req, res)=> {
    
    /*return res.json({
        usuario: req.usuario,
        nombre: req.usuario.nombre,
        email: req.usuario.email
    })*/


    let desde = req.query.desde || 0; 
    desde= Number(desde);
    let limite = req.query.limite || 5;
    limite= Number(limite);
    let estado= req.query.estado || true;

    Usuario.find({estado},"nombre estado role google")//muestra los registros
            .skip(desde) 
            .limit(limite)
            .exec((err,usuario)=>{
                if ( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                Usuario.countDocuments({estado},(err,conteo)=>{
                    res.json({
                        ok:true,
                        usuario,
                        cuantos: conteo
                    })
                });
                
            })
    //res.json('get usuario');
});


app.post('/usuario', function (req, res) {

    let body = req.body;
    console.log(body)
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err,usuarioDB)=> {
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        //usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });

   
    
});


app.put('/usuario/:id', [verificaToken,verificaAdmin_Role], function (req, res) {
    
    let id = req.params.id;
    let body = _.pick(req.body,['nombre','email','img','role','estado']); //controlo las datos que se pueden modificar
    Usuario.findByIdAndUpdate(id, body,{new: true, runValidators: true, context: 'query'},(err,usuarioDB)=> {
        
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        };
        res.json({
            id,
            usuario: usuarioDB
         }); 
    });
    
});




app.delete('/usuario/:id', verificaToken, function (req, res) {


    let id = req.params.id;
    let newEstado={
        estado:false
    };
    Usuario.findByIdAndUpdate(id,newEstado,{new:true},(err,usuarioBorrado)=>{
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        };
        if (!usuarioBorrado.estado){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario no encontrado'
                }
            });
        }
        res.json({
            id,
            usuario: usuarioBorrado,
            message:'usuario desactivado'
         }); 
    });



    /*
    //elimina el registro de la db
    //
    Usuario.findByIdAndRemove(id, (err,usuarioBorrado) => {
        if (err){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'Usuario no encontrado'
                }
            });
        };
        res.json({
            ok:true,
            usuario:usuarioBorrado
        });
    });*/
});

module.exports = app;
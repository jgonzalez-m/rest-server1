const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const Proyecto = require('../models/proyectos');
const app = express();

var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));
//falta añadir verificador de token
app.get('/proyecto',(req,res)=>{
    let idUser = req.query.idUser;
    if(!idUser){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de usuario'
        });
    }
    Proyecto.find({idUser})
            .exec((err,proyecto)=>{
                if ( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                Proyecto.countDocuments({},(err,conteo)=>{
                    res.json({
                        ok:true,
                        proyecto,
                        cuantos: conteo
                    })
                });
                
            })
});


app.post('/proyecto',(req,res)=>{
    let body = req.body;
    
    
    let proyecto = new Proyecto({
        idUser: body.idUser,
        idProyecto: body.idProyecto,
        estado: body.estado,
        ultimaActualizacion:body.ultimaActualizacion
    });
    proyecto.save((err,proyectoDB)=> {
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
            ok: true,
            proyecto: proyectoDB
        })
    });
});


app.put('/proyecto/:id',(req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body,['estado','ultimaActualizacion']); //controlo las datos que se pueden modificar
    Proyecto.findByIdAndUpdate(id,body,{new: true, runValidators: true, context: 'query'},(err,proyectoDB)=>{
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        };
        res.json({
            id,
            proyecto: proyectoDB
         }); 
    });
});

module.exports = app;
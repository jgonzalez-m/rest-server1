const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const apiconect = require('../middlewares/MDDconnect');
const Proyecto = require('../models/proyectos');
const Modelo = require('../models/modelos');
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


app.post('/proyecto',async (req,res)=>{
    let body = req.body;
    
    let idProyecto=await apiconect.create(process.env.MDD_INIT);
    if(idProyecto != Error){
        var proyecto = new Proyecto({
            idUser: body.idUser,
            nombre: body.nombre,
            idProyecto: idProyecto,
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
    }else{
        return res.status(503).json({
            ok:false,
            Error:"no hay conexion con ModelManager"
        })
    }  
    
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


app.post('/proyecto/add',async (req,res)=>{//funcion temporal posiblente se remplaze
    console.log("test");
    let body = req.body;
    var modelo = new Modelo({});
    modelo.save((err,proyectoDB)=> {
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }
        res.json({
             id:proyectoDB.id
        });
    });
});
module.exports = app;
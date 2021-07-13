const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const apiconect = require('../middlewares/MDDconnect');
const Proyecto = require('../models/proyectos');
const Modelo = require('../models/modelos');
const {verificaToken} = require('../middlewares/autenticacion');//en {} se importa la funcion especifica

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));
//falta añadir verificador de token
app.get('/proyecto',verificaToken,(req,res)=>{
    let idUser = req.query.idUser;
    let estado = req.query.state
    if(!idUser){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de usuario'
        });
    }
    Proyecto.find({idUser,estado})
            .exec((err,proyecto)=>{
                if ( err ){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }
                Proyecto.countDocuments({"idUser":idUser},(err,conteo)=>{
                    res.json({
                        ok:true,
                        proyecto,
                        cuantos: conteo
                    })
                });
                
            })
});


app.post('/proyecto',verificaToken,async (req,res)=>{
    let body = req.body;
    console.log(body)
    let idProyecto=await apiconect.create(process.env.MDD_INIT);//replantear orden de este servicio
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
                proyecto: proyectoDB,
            })
        });
    }else{
        return res.status(503).json({
            ok:false,
            Error:"no hay conexion con ModelManager"
        })
    }  
    
});


app.put('/proyecto/:id',(req,res)=>{//actualizacion de los proyectos
    let id = req.params.id;
    let body = _.pick(req.body,['estado','ultimaActualizacion','nombre']); //controlo las datos que se pueden modificar
    console.log(body)
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

//test de actualizacion de stados con otros tipos de busqueda
app.put('/proyecto/stateModel/:id',(req,res)=>{//requiere idProyecto no id del objeto
    let idProyecto = req.params.id;
    let body = _.pick(req.body,['estadoIstar','estadoAc','estadoMoo']); //controlo las datos que se pueden modificar
    Proyecto.findOneAndUpdate({idProyecto},body,{new: true, runValidators: true, context: 'query'},(err,proyectoDB)=>{
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        };
        res.json({
            
            proyecto: proyectoDB
         }); 
    });
})


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
        var proyecto = new Proyecto({
            idUser: body.idUser,
            nombre: body.nombre,
            idProyecto: proyectoDB.id,
            estado: body.estado,
            ultimaActualizacion:body.ultimaActualizacion
        });
        console.log(body)
        proyecto.save((err,proyectoDB)=> {
            if ( err ){
                return res.status(400).json({
                    ok:false,
                    err
                });
            }
            
            res.json({
                proyecto:proyectoDB
            });
            
        });
        
    });
});

module.exports = app;
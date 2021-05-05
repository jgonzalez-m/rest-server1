const express = require('express');
const apiconnect = require('../middlewares/MDDconnect');
const cors = require('cors');
const _ = require('underscore');
const { json } = require('body-parser');
const { Body } = require('node-fetch');
// 
const Modelo = require('../models/modelos');
const { rest } = require('underscore');
const modelos = require('../models/modelos');
// 
const app = express();

// ===============================

// ===============================




app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));
// 
// devulve los modelos
// no esta en uso 
app.get('/modelos',async (req,res)=>{
    console.log(req.query.id);
    let idProyecto = req.query.id;
    let type = req.query.type;
    if(!idProyecto){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de proyecto'
        });
    }
    let url = process.env.MDD_GET_MODEL + idProyecto;
    console.log(url);
    let modelo = await apiconnect.model(url);
    if(type==="0"){
        console.log(modelo.model_i);
        modelo={model_i:modelo.model_i}
        res.send(modelo);
    }else if(type==="1"){
        modelo={model_AC:modelo.model_AC}
        console.log(modelo.model_AC);
        res.send(modelo);

    }else if(type==="2"){
        modelo={model_OOM:modelo.model_OOM}
        console.log(modelo.model_OOM)
        res.send(modelo.model_OOM)
    }else{
        res.json({
            Error
        }
            
        )
    }
    // res.json({
    //     modelo
        
    
    // });
});


//========================== 
// solo para pruebas borrar
app.get('/modelos/get',async (req,res)=>{
    console.log(req.query.id);
    let idProyecto = req.query.id;
    if(!idProyecto){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de proyecto'
        });
    }
    Modelo.findById(idProyecto,(err,modelo)=>{
        if ( err ){
            return res.status(400).json({
                ok:false,
                err
            });
        }else{
            return res.json({
                modelo
            });
        };
        
    });
});
// 

//==========================================
//solo verifica
//==========================================
app.post('/modelos/verificar',async (req,res)=>{
    console.log("verificando modelo");
    let body = req.body;
    console.log(body);
    let respuesta = await apiconnect.postMdd(process.env.MDD_VERIFY,body);
    console.log("test")
    console.log(respuesta);
    return res.json({
      respuesta
    });//await apiconnect.verify(process.env.MDD_VERIFY,body);
});



app.post('/modelos/transformar',async (req,res)=>{//servicio solo para transformar de i* a ac
    console.log("transformando modelo");
    let body = req.body;
    let respuesta = await apiconnect.postMdd(process.env.MDD_2AC,body);
    console.log("test ttransform");
    body={
        model_AC:{
            model:respuesta
        }
    }
    let idProyecto = req.query.id;
    let url = process.env.MDD_SAVE+idProyecto;
    respuesta = await apiconnect.putMDD(url,body);
    console.log(respuesta);
    return res.json({
        respuesta
    });
});
//
//actualiza los modelos testeo
//

app.put('/modelos',async (req,res)=>{//actualizar modelo
    let body =  _.pick(req.body,['model_AC','model_OOM','model_i']);
    //var modelo = new Modelo(body.modelo);
    console.log(req.query.id);
    console.log("test guardado");
    console.log(body);
    let idProyecto = req.query.id;
    let url = process.env.MDD_SAVE+idProyecto;
    console.log(url);
    let respuesta = await apiconnect.putMDD(url,body);
    console.log(respuesta)
    return res.json({
        state:respuesta
    })
});

module.exports=app;
const express = require('express');
const apiconnect = require('../middlewares/MDDconnect');
const cors = require('cors');
const _ = require('underscore');
const { json } = require('body-parser');
const { Body } = require('node-fetch');
const app = express();

// ===============================

// ===============================
let test1={
    algo:{
        nombre:{},
        tipo:"sada"
    }
};
let test2={
    data:"data"
};


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded



var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));
// 
// devulve los modelos
// 
app.get('/modelos',async (req,res)=>{
    console.log(req.query.id);
    let idProyecto = req.query.id;
    if(!idProyecto){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de proyecto'
        });
    }
    let url = process.env.MDD_GET_MODEL + idProyecto;
    let modelo = await apiconnect.model(url);
    console.log(modelo);
    res.send(modelo);
    // res.json({
    //     modelo
        
    
    // });
});

//==========================================
//solo verifica
//==========================================
app.post('/modelos/verificar',async (req,res)=>{
    console.log("verificando modelo");
    let body = req.body;
    //console.log(body);
    let respuesta = await apiconnect.postMdd(process.env.MDD_VERIFY,body);
    console.log(respuesta);
    return res.json({
      respuesta
    });//await apiconnect.verify(process.env.MDD_VERIFY,body);
});



app.post('/modelos/transformar',async (req,res)=>{
    console.log("transformando modelo");
    let body = req.body;
    let respuesta = await apiconnect.postMdd(process.env.MDD_2AC,body);
    return res.json({
        respuesta
    });
});
//
//actualiza los 
//

app.put('/modelos',(req,res)=>{
    
});

module.exports=app;
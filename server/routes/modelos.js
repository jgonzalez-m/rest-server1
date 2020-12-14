const express = require('express');
const cors = require('cors');
const _ = require('underscore');
const app = express();

// ===============================

// ===============================
let modelo={
  "actors": [
    {
      "id": "1ed3469e-ba8b-4947-ab59-d133c74e4401",
      "text": "Actor",
      "type": "istar.Actor",
      "x": 306,
      "y": 173,
      "customProperties": {
        "Description": ""
      },
      "nodes": []
    },
    {
      "id": "220c411b-f161-45c1-894a-3ac8cef6e8d8",
      "text": "Actor",
      "type": "istar.Actor",
      "x": 915,
      "y": 96,
      "customProperties": {
        "Description": ""
      },
      "nodes": []
    }
  ],
  "orphans": [],
  "dependencies": [
    {
      "id": "063350cd-9ddb-4194-a0d3-356f552360c9",
      "text": "Dependum",
      "type": "istar.Goal",
      "x": 610.5,
      "y": 134.5,
      "customProperties": {
        "Description": ""
      },
      "source": "1ed3469e-ba8b-4947-ab59-d133c74e4401",
      "target": "220c411b-f161-45c1-894a-3ac8cef6e8d8"
    }
  ],
  "links": [
    {
      "id": "68574a33-fac7-4224-abc4-65696f0ce279",
      "type": "istar.DependencyLink",
      "source": "1ed3469e-ba8b-4947-ab59-d133c74e4401",
      "target": "063350cd-9ddb-4194-a0d3-356f552360c9"
    },
    {
      "id": "cfc84755-3afd-4e9c-abe9-f9c443ce0364",
      "type": "istar.DependencyLink",
      "source": "063350cd-9ddb-4194-a0d3-356f552360c9",
      "target": "220c411b-f161-45c1-894a-3ac8cef6e8d8"
    }
  ],
  "display": {},
  "tool": "pistar.2.0.0",
  "istar": "2.0",
  "saveDate": "Mon, 14 Dec 2020 01:37:47 GMT",
  "diagram": {
    "width": 2000,
    "height": 1300,
    "customProperties": {
      "Description": ""
    }
  }
}



var corsOptions = {
    origin:  '*' ,
    optionsSucessStatus: 200
}
app.use(cors(corsOptions));

app.get('/modelos',(req,res)=>{
    console.log(req.query.id);
    let idProyecto = req.query.id;
    if(!idProyecto){
        return res.status(400).json({
            ok:false,
            message: 'debe enviar un id de proyecto'
        });
    }
    res.json({
        modelo
        
    
    })
});


app.put('/modelos',(req,res)=>{
    
});

module.exports=app;
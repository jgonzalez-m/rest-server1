const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
//const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;

let proyectoSchema = new Schema({
    idUser:{
        type: String,
        required:[true,"el id del usuario es necesario"]
    },
    idProyecto:{
        type: String,
        unique:true,
        required:[true,'el id del proyecto es necesario']
    },
    estado:{
        type:Boolean
    },
    ultimaActualizacion:{
        type:Date
    }
  
});
proyectoSchema.plugin(UniqueValidator)
module.exports = mongoose.model('Proyecto',proyectoSchema);
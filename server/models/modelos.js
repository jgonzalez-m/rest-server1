const mongoose = require('mongoose');
const UniqueValidator = require('mongoose-unique-validator');
//const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;

let modeloSchema = new Schema({
    
    "model_AC": {
            "date":"",
            "model": {
                "actors": [],
                "communicativeEvents": [],
                "communicativeInteractions": [],
                "precedenceRelations": [],
                "specialisedCommunicativeEvents": [],
                "trazability": ""
            },
            "validator": []
        },
    "model_OOM": {
            "date":"",
            "model": {
                "model": ""
            },
            "validator": []
        },
    "model_i": {
            "date":"",
            "model": {
                "actors": [],
                "dependencies": [],
                "links": []
            },
            "validator": []
        }
    
  
});
modeloSchema.plugin(UniqueValidator)
module.exports = mongoose.model('Modelos',modeloSchema);




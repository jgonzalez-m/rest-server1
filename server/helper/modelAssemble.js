/**
 funcion con el proposito de re ensamblar los modelos a guardar ya que el back end mdd no los reensambla 
 si no que los sobreescribe
 */
const apiconnect = require('../middlewares/MDDconnect');

let Assemble=async (url,body)=>{
    let modelo = await apiconnect.model(url);
    
    let v=await JSON.stringify(body)
    v=v.split('"',2)
    if(v[1]=="model_AC"){
        console.log("resulta")
        modelo.model_AC=body.model_AC
        console.log(modelo)
    }
    if(v[1]=="model_i"){
        console.log("resulta")
        modelo.model_i=body.model_i
        console.log(modelo)
    }
    if(v[1]=="model_OOM"){
        console.log("resulta")
        modelo.model_OOM=body.model_OOM
        console.log(modelo)
    }
    return modelo
}
module.exports={
    Assemble
}
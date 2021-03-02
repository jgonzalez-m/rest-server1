const fetch = require("node-fetch");

let  create=async (url)=>{

    try {
        console.log(url);
        let res = await fetch(url,{
        method: 'GET'
        });
        
        let resMdd = await res.json();
        console.log(resMdd.id);
        return resMdd.id;
        
    } catch (e) {
        return Error;
              // algo ha ido mal
        }
      
};

let postMdd= async (url,body)=>{
    try {
        console.log("intentando verificar");
        console.log(body);
        let res = await fetch(url,{
            method: 'POST',
            body:JSON.stringify(body)
        });
        let resMdd = await res.json();
        console.log(resMdd);
        return resMdd;
    } catch(e){
        console.log(e);
        return Error;
    }
};

let model =  async (url)=>{
    try {
        console.log("obteniendo modelo");
        let res = await fetch(url,{
            method: 'GET',
        });
        let resMdd = await res.json();
        return resMdd;
    } catch {
        console.log("hubo un error");
        console.log(e);
        return Error;
    }
};

let putMDD = async (url , body)=>{
    try {
        console.log("intentando actualizar");
        let res = await fetch(url,{
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            method: 'PUT',
            body: JSON.stringify(body),
            redirect: 'follow'
        });
        console.log(res);
        return true;
    } catch(e){
        console.log("fallo");
        console.log(e);
        return false;
    }






};
module.exports={
    create,
    postMdd,
    model,
    putMDD
};
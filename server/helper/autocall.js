const fetch = require("node-fetch");

let UpdateProject =async (data)=>{
    
    try {
        console.log("actualizando proyectos");
        let id = data._id
        
        data = await JSON.stringify(data)
        //data = await JSON.parse(data)
        
        //data = await JSON.stringify(data)
        console.log(data)
        let url =process.env.STATE_UPDATE
        url=url+id
        console.log(url)
       
        let res = await fetch(url,{
            method: 'PUT',
            headers: {
                        'Content-Type': 'application/json'
                        //'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      
            body:data
            
        });
        let resMdd = await res.json();
        console.log(resMdd)
        return true
    } catch(e) {
        console.log("hubo un error");
        console.log(e)
        return Error;
    }
}
module.exports={
    UpdateProject
}
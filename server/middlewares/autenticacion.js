const jwt = require('jsonwebtoken');
//======================
// verificar token
//======================

let verificaToken = (req, res, next)=>{

    let token = req.get('token');//en 'token' colocar el nombre de el header que envia el token
    jwt.verify(token,process.env.SEED, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        };
        
        req.usuario = decoded.usuario;
        next();
    });
   
};
// =====================
//  verifica token mail
// =====================
let verificaTokenMail = (req, res, next)=>{

    let token = req.get('token');//en 'token' colocar el nombre de el header que envia el token
    jwt.verify(token,process.env.SEED_MAIL, (err,decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        };

        req.email = decoded.email;
        next();
    });
   
};
//======================
// verificar administrador
//======================
let verificaAdmin_Role = (req,res,next)=>{
    let usuario = req.usuario;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok:false,
            err: {
                message: 'El usario no es administrador'
            }
        });
    };

    
};
module.exports= {
    verificaToken,
    verificaAdmin_Role,
    verificaTokenMail
};
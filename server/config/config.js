



//=============================
// puerto
//===========================
process.env.Port = process.env.Port || 3000;

//=======
// Entorno
//
//========
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======
// vencimiento del token
//60 segundos
//60 minutos
//24 horas
//30 dias
//========
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;
//=======
// SEED de autenticacion
//
//========
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';//modificar a futuro
//=======
// mongo
//
//========

let urlDB;
/*
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else{
    
    urlDB = 'mongodb+svr://koke:@cluster0.bvxls.mongodb.net/cafe'; 
}
process.env.URLDB = urlDB;
*/

//=============================
// ip MDD
//===========================
process.env.MDD_INIT = process.env.MDD_INIT || "http://192.168.2.3:8023/init"; //inicio proyecto
process.env.MDD_VERIFY = process.env.MDD_VERIFY || "http://192.168.2.4:8024";
process.env.MDD_GET_MODEL = process.env.MDD_GET_MODEL || "http://192.168.2.3:8023/project/";
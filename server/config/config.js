



//=============================
// puerto
//===========================
process.env.PORT = process.env.PORT || 3000;

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
process.env.SEED = process.env.SEED || 'iugbjkbnzxauoigcusiabhdyulagluly';//modificar a futuro
process.env.SEED_MAIL = process.env.SEED_MAIL || 'mail confirm';
//=======
// mongo
//
//========


process.env.URLDB = process.env.URLDB || "mongodb://localhost:27017/wirin";

//=============================
// ip MDD
//===========================
process.env.MDD_INIT = process.env.MDD_INIT || "http://192.168.0.223:8023/init"; //inicio proyecto
process.env.MDD_VERIFY = process.env.MDD_VERIFY || "http://192.168.0.223:8024";
process.env.MDD_GET_MODEL = process.env.MDD_GET_MODEL || "http://192.168.0.223:8023/project/";
process.env.MDD_2AC = process.env.MDD_2AC || "http://192.168.0.223:8025/adapter";
process.env.MDD_SAVE = process.env.MDD_SAVE || "http://192.168.0.223:8023/project/"
process.env.STATE_UPDATE = process.env.STATE_UPDATE || "http://192.168.0.223:3000/proyecto/stateModel/"

// ==========================
// Wirin
// ==========================
process.env.WIRIN = process.env.WIRIN || "https://wirin.netlify.app/"
// ==========================
// mail
// ==========================
process.env.MAIL_USER = process.env.MAIL_USER || "";
process.env.MAIL_PASS = process.env.MAIL_PASS || "";

// ==========================
//  keys
// ==========================
process.env.KEY_CLIENT_ID = process.env.KEY_CLIENT_ID || "";
process.env.KEY_PRIVATE = process.env.KEY_PRIVATE || ""
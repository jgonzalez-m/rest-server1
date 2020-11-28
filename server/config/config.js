



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
// mongo
//
//========

let urlDB;
/*
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
} else{
    
    urlDB = 'mongodb+svr://koke:jtwFW3Dc4piqN90P@cluster0.bvxls.mongodb.net/cafe';
}
process.env.URLDB = urlDB;
*/

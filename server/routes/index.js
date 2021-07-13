const express = require('express');
const app = express();


app.use( require('./usuario'));
app.use(require('./login'));
app.use(require('./proyecto'));
app.use(require('./modelos'));
app.use(require('./mailer'));
module.exports=app;
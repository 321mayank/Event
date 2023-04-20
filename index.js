const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const registerRouter = require('./router/registerAndLogin/Register');
const loginRouter = require('./router/registerAndLogin/login');
const homeRouter = require('./router/home/home');
const organisationRegisterRouter = require('./router/organisation/organisationRegister');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const redis = require('redis');
const client = redis.createClient({ host: 'localhost', port: 6379 });

app.get('/', (req, res) => {
  // rendered the login page
  res.render('index');
});

app.use('/', registerRouter);

app.use('/', loginRouter);

app.use('/', homeRouter);

app.use('/', organisationRegisterRouter);

app.all('*',(req,res)=>{
  res.sendStatus(404)
})
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use(  (err,req,res,next)=> {


})

app.server = server;


//jwt token
//localhost/v1/example
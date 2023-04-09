const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const registerAndLoginRouter = require('./router/registerAndLogin');
const homeRouter = require('./router/home');
const organisationAndEventRouter = require('./router/organisationAndEvent');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  // rendered the login page
  res.render('index');
});

app.get('/login',(req,res)=>{
  res.render('login')
})

app.use('/', registerAndLoginRouter);

app.use('/', homeRouter);
app.use('/', organisationAndEventRouter);


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

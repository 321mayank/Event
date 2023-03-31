const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const registerAndLogin_router= require('./router/registerAndLogin')
const home_router = require("./router/home")
const organisationAndEvent_router = require('./router/organisationAndEvent')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => { //rendered the login page
    res.render('index');
})



app.use('/',registerAndLogin_router)

app.use('/',home_router)
app.use('/',organisationAndEvent_router)
// app.get('/:name/home',(req,res)=>{
//   res.render('home')
// })


app.listen(3000, () => {
  console.log('Server listening on port 3000');
});



// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="UTF-8">
//     <title>Event</title>
//   </head>
//   <body>
//     <h1>Welcome</h1>
   


//     <a href="./home">Home</a>
//     <a href="./events">Events</a>
//     <a href="./profile">Profile</a>
//   </body>
// </html> 
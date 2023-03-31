// const { login } = require('../validation/validation');
// const { register } = require('../validation/validation');
const shortid = require('shortid')
const { loginQuery, registerQuery, organizationCheckQuery, organisationRegisterQuery} = require('../database/query')
const {connection_sql} = require('../database/sql_connection')
const express = require('express')
const app = express()
const session = require('express-session')
const registerAndLogin_router = express.Router()
const bodyParser = require('body-parser');
const {hashPassword  }= require('../security/password_hash')
const bcrypt = require('bcrypt')
registerAndLogin_router.use(session({
  secret: 'abdjjdirgnkszvvk',
  resave: true,
  saveUninitialized: true
}))

 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

registerAndLogin_router.get('/register',(req,res)=>{
    res.render('register')
}) 

  registerAndLogin_router.post('/register',async (req,res) => { // validated the register data 
    // const reg_data = register.body.validate(req.body)

    const {name, email , password }  = req.body
    const salt = await bcrypt.genSalt();
    const passHash = await hashPassword(password,salt); // used hashPassword to bcrypt password 
    const userID = shortid.generate();
    
    console.log(salt)
    console.log(passHash)

    const checkQuery = `SELECT * FROM user WHERE email='${email}'`
    connection_sql.query(checkQuery,(err,sql_value)=>{ // checking if email allready exist 
      if (sql_value.length>0) {
        res.send("email allready exist")
      }
      else{
        const insertQuery = registerQuery(userID, name, email, password, passHash, salt);; 
    connection_sql.query(insertQuery, (err, result) => { // if no error then the insert query will execute and add the user to database
      if (err) throw err;
      console.log("User data inserted successfully");
      
      res.send("User registerd Successfully")

    })
      }
    })

    
 
    // console.log(reg_data)
   })


registerAndLogin_router.get('/login', (req, res) => { //rendered the login page
    res.render('login');
});
  
  registerAndLogin_router.post('/login', (req, res) => { 
    // const data = login.body.validate(req.body)
     const { email, password } = req.body
      const fetchQuery = loginQuery(email);
      connection_sql.query(fetchQuery, async  (err,result)=>{
        
        if (err) {
          console.log(err);
          res.send('An error occurred');
        } else {
        
          if (result.length > 0) {
            const { userID,name , hash , salt  } = result[0];  

            const inputHash = await hashPassword(password, salt);
           
            if (inputHash === hash) {
              req.session.userID = userID
              req.session.Uname = name
              req.session.email = email

              connection_sql.query(organizationCheckQuery(userID), (err,result)=>{
                 
                if (err) {
                    console.log(err);
                    res.send('An error occurred');
                } else {
                    if(result.length>0){
                      res.redirect('/home');
                    } else {
                      res.redirect('/organisation-register');
                    }
                }

              })

              
            } else {
              res.send('Email or password is incorrect');
            }
          } else {
            res.send('Email or password is incorrect');
          }

        }
      })
   
      
}); 



 


   
   module.exports = registerAndLogin_router
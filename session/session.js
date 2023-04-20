
function sessionChecker  (req, res, next) {
    const userid = req.session.userID
    console.log(userid)
   if (userid) {
     res.redirect('/home');
   } else {
     next();
   }
 };
 

 module.exports = {
    sessionChecker,
  };
  
function profileView  (req, res) {
    const name = req.session.name;
    const { email } = req.session;
    res.render('profile', { name, email }); 
  };


  module.exports = {
    profileView
  };
  
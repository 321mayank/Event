const nodemailer = require('nodemailer')

async function sendEmail(req,res){
    let testAccount = await nodemailer.createTestAccount();
   const email =  req.session.regEmail

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'kayla90@ethereal.email',
          pass: 'c3SRJdQMG14Y8BNFQu'
        }
    });

  let info = await transporter.sendMail({
    
    from: '"Manager" <Support@eventmanager.com>', // sender address
    to: email, 
    subject: "Welcome", // Subject line
    text: "Welcome to EventManager", // plain text body
    html: "<b>Welcome to EventManager</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

 res.send(info)



}

module.exports={
    sendEmail
}
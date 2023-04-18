const nodemailer = require('nodemailer')

async function sendEmail(req,res){
    let testAccount = await nodemailer.createTestAccount();
   const email = req.params.email

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'josue.dach51@ethereal.email',
            pass: 'UqQZtZbzNyge5kzkqR'
        }
    });

  let info = await transporter.sendMail({
    
    from: '"Manager" <Support@eventmanager.com>', // sender address
    to: email, 
    subject: "Welcome", // Subject line
    text: "Welcome to EventManager", // plain text body
    html: "<b>Manager</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

 



}

module.exports={
    sendEmail
}
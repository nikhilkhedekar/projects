const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = nodemailer.createTestAccount();

  //https://ethereal.email/
  const transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: "ernie.pacocha92@ethereal.email",//testAccount.user,
      pass: "w75Q8Tax3KtsVKTdXB",//testAccount.pass,
    },
    // service: "gmail",
    // auth: {
    //   user: "nikhilkhedekar2012@gmail.com",//testAccount.user,
    //   pass: "mauizmmayjtshpzx",//testAccount.pass,
    // },
  });

  return transporter.sendMail({
    from: '"NMK STORE" <nmkstore@gmail.com>', // sender address
    to,
    subject,
    html,
  }, (err, info) => {
    if (err) {
      console.log('Error occurred. ' + err.message);
      return process.exit(1);
    }

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

module.exports = sendEmail;

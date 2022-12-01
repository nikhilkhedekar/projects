const amqplib = require('amqplib/callback_api');

const sendVerificationEmail = ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;
  //http://localhost:3000/user/verify-email?token=ecd0c9d5c878c05beb21165eb4916a68508ee9cc53b4224b663cd21699a18b8d23d4a7b7f2f2918d&email=sapna@gmail.com

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  // Create connection to AMQP server
  amqplib.connect(url, (err, connection) => {
    if (err) {
      console.error(err.stack);
      res.json({ error: err })
      return process.exit(1);
    }

    // Create channel
    connection.createChannel((err, channel) => {
      if (err) {
        console.error(err.stack);
        res.json({ error: err })
        return process.exit(1);
      }

      // Ensure queue for messages
      channel.assertQueue("nodemailer-amqp", {
        // Ensure that the queue is not deleted when server restarts
        durable: true
      }, err => {
        if (err) {
          console.error(err.stack);
          res.json({ error: err })
          return process.exit(1);
        }
      });
      // Create a function to send objects to the queue
      // Javascript object is converted to JSON and then into a Buffer
      channel.sendToQueue("nodemailer-amqp", Buffer.from(JSON.stringify({
        from: '"NMK STORE" <nmkstore@gmail.com>',
        to: email,
        subject: 'Email Confirmation',
        html: `<h4> Hello, ${name}</h4>
        ${message}
        `,
      })), {
        // Store queued elements on disk
        persistent: true,
        contentType: 'application/json'
      });    
      console.log("verifiavationMail sent");  
    });
  });
};

module.exports = sendVerificationEmail;

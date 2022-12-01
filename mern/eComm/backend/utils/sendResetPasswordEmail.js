const amqplib = require('amqplib/callback_api');

const sendResetPassswordEmail = ({ name, email, token, origin }) => {
  const url = process.env.CLOUDAMQP_URL || "amqp://localhost";
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

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
        subject: 'Reset Password',
        html: `<h4>Hello, ${name}</h4>
        ${message}
        `,
      })), {
        // Store queued elements on disk
        persistent: true,
        contentType: 'application/json'
      });            
    });
    console.log("reset pwd email sent");
  });
};

module.exports = sendResetPassswordEmail;

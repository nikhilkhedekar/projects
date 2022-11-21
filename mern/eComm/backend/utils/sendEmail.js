const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');
const amqplib = require('amqplib/callback_api');

// let testAccount = nodemailer.createTestAccount();

//https://ethereal.email/
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: "johnathan.boyer@ethereal.email",//testAccount.user,
    pass: "V7fsrNdDP6th7psYxV",//testAccount.pass,
  },
  // service: "gmail",
  // auth: {
  //   user: "nikhilkhedekar2012@gmail.com",//testAccount.user,
  //   pass: "mauizmmayjtshpzx",//testAccount.pass,
  // },
});

amqplib.connect("amqp://localhost", (err, connection) => {
  console.log("connected");
  if (err) {
    console.error(err.stack);
    return process.exit(1);
  }
  // Create channel
  connection.createChannel((err, channel) => {
    console.log("channelcreated");
    if (err) {
      console.error(err.stack);
      return process.exit(1);
    }

    // Ensure queue for messages
    channel.assertQueue("nodemailer-amqp", {
      // Ensure that the queue is not deleted when server restarts
      durable: true
    }, err => {
      if (err) {
        console.error(err.stack);
        return process.exit(1);
      }
    });
    // Only request 1 unacked message from queue
    // This value indicates how many messages we want to process in parallel
    channel.prefetch(1);

    // Set up callback to handle messages received from the queue
    channel.consume("nodemailer-amqp", data => {

      if (data === null) {
        return;
      }

      // Decode message contents
      let message = JSON.parse(data.content.toString());
      console.log("messageData", message);

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.error(err.stack);
          // put the failed message item back to queue
          return channel.nack(data);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // remove message item from the queue
        channel.ack(data);
      });
    });
  });
});

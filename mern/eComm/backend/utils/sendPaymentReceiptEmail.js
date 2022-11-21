const amqplib = require('amqplib/callback_api');

const sendPaymentReceiptEmail = async ({
    name,
    email,
    fileName
}) => {
    const message = `<p>Please find payment receipt in attachments</p>`;
    // Create connection to AMQP server
    return amqplib.connect("amqp://localhost", (err, connection) => {
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
                subject: "Payment Receipt",
                html: `<h4> Hello, ${name}</h4><br /><span>${message}</span>`,
                // attachments: [
                //     {
                //         filename: `${fileName}.pdf`,
                //         path: path.join(__dirname, `../public/payments/${fileName}.pdf`),
                //         contentType: 'application/pdf'
                //     }
                // ]
            })), {
                // Store queued elements on disk
                persistent: true,
                contentType: 'application/json'
            });    
            console.log("payment receipt email sent");
        });
    });
};

module.exports = sendPaymentReceiptEmail;
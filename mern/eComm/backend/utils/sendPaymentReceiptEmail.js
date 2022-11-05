const path = require('path');
const sendEmail = require('./sendEmail');

const sendPaymentReceiptEmail = async ({
    name,
    email,
    fileName
}) => {    
    const message = `<p>Please find payment receipt in attachments</p>`;

    return sendEmail({
        to: email,
        subject: 'Payment Receipt',
        html: `<h4> Hello, ${name}</h4>
      ${message}
      `,
        attachments: [
            {
                filename: `${fileName}.pdf`,
                path: path.join(__dirname, `../public/payments/${fileName}.pdf`),
                contentType: 'application/pdf'
            }
        ]
    });
};

module.exports = sendPaymentReceiptEmail;
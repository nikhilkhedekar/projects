const vonage = require("./vonageConfig");

const VonageSendMessage = ({ to, text }) => {    
    const from = "NMK Store";
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {

            console.log("sendMessageError", err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.")
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`)
            }
        }
    })
}

module.exports = VonageSendMessage
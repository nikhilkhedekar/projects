const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
    apiKey: "c310152d",
    apiSecret: "r7YHX9UsuxUdr4Rj"
});

module.exports = vonage;
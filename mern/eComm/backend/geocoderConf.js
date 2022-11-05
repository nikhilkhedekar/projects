const NodeGeocoder = require('node-geocoder');

const options = {
  provider: "mapquest",
  httpAdapter: 'https',
  apiKey: "QXAluhtsjP8SObobkwoiQgsLRvoxLlFA",
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
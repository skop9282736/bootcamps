const Geocoder = require('node-geocoder');
const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' });

const options = {
  provider: process.env.GEO_CODER_PROVIDER,
  httpAdapter: 'https',
  apiKey: process.env.GEO_CODER_KEY,
  formatter: null
};

const geocoder = Geocoder(options);

module.exports = geocoder;

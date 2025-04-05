// For Node.js applications
require('dotenv').config();

const config = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
};

module.exports = config;

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/clothing-website',
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

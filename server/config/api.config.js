const BCRYPT_SALT = 10;
const TOKEN_EXPIRES_IN = '24h';
const JWT_SECRET_KEY = 'GOOD_JWT_SECRET_KEY';

module.exports = {
  API_URI: process.env.API_URI,
  MONGO_URI: process.env.MONGO_URI,
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || BCRYPT_SALT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || TOKEN_EXPIRES_IN
};

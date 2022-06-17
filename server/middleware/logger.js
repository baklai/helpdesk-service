const morgan = require('mongoose-morgan');

const { MONGO_URI } = require('../config/api.config');

const DEV_LOG =
  ':method :status :url  :response-time ms - :res[content-length]';
const PROD_LOG =
  ':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

morgan.token('remote-user', function (req, res) {
  return req.user ? `${req.user.login}` : 'anonymous';
});

module.exports = morgan(
  {
    collection: 'logger',
    connectionString: MONGO_URI
  },
  {
    skip: function (req, res) {
      return res.statusCode === 500;
    }
  },
  process.env.NODE_ENV === 'production' ? PROD_LOG : DEV_LOG
);

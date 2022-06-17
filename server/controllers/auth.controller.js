const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { toResponse } = require('../models/user.model');
const userService = require('../services/user.service');

const {
  JWT_SECRET_KEY,
  TOKEN_EXPIRES_IN,
  BCRYPT_SALT
} = require('../config/api.config');

const signin = async (req, res, next) => {
  try {
    const { login, password } = req.body;
    const user = await userService.findOneByLogin(login);
    if (user) {
      if (user.isActive) {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
          const token = jwt.sign(
            {
              id: user._id,
              name: user.name,
              email: user.email,
              login: user.login,
              isActive: user.isActive,
              isAdmin: user.isAdmin,
              scope: user.scope,
              created: user.created
            },
            JWT_SECRET_KEY,
            { expiresIn: TOKEN_EXPIRES_IN }
          );
          res.status(200).json({ token });
        } else {
          res.status(403).json({ message: 'The password is incorrect.' });
        }
      } else {
        res.status(403).json({ message: 'Account is disabled.' });
      }
    } else {
      res.status(404).json({ message: 'User is not found.' });
    }
  } catch (err) {
    next(err);
  }
};

const me = async (req, res) => {
  res.json({ user: req.user });
};

module.exports = { signin, me };

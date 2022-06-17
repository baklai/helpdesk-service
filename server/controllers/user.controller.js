const bcrypt = require('bcrypt');

const Service = require('../services/user.service');
const { toResponse } = require('../models/user.model');

const { BCRYPT_SALT } = require('../config/api.config');

const findAll = async (req, res, next) => {
  try {
    const items = await Service.findAll();
    res.status(200).json(items.map(toResponse));
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const item = await Service.findOne(req.params.id);
    if (item) {
      res.status(200).json(toResponse(item));
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, BCRYPT_SALT);
    const item = await Service.createOne({ ...req.body, password });
    res.status(200).json(toResponse(item));
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const password = req.body.password
      ? await bcrypt.hash(req.body.password, BCRYPT_SALT)
      : null;
    const item = password
      ? await Service.updateOne(req.params.id, {
          ...req.body,
          password
        })
      : await Service.updateOne(req.params.id, {
          ...req.body
        });
    if (item) {
      res.status(200).json(toResponse(item));
    } else {
      res.sendStatus(400);
    }
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const item = await Service.removeOne(req.params.id);
    if (item) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

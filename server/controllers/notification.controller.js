const Service = require('../services/notification.service');

const findAll = async (req, res, next) => {
  try {
    const items = await Service.findAll({ _id: req.user.id });
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const createMany = async (req, res, next) => {
  try {
    await Service.createMany({ ...req.body });
    res.status(200).json('Ok');
  } catch (err) {
    next(err);
  }
};

const removeOne = async (req, res, next) => {
  try {
    const item = await Service.removeOne(req.params.id, req.user.id);
    if (item) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { findAll, createMany, removeOne };

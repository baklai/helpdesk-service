const Service = require('../services/ipaddress.service');

const findAll = async (req, res, next) => {
  try {
    const items = await Service.findAll(req.query);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const findOne = async (req, res, next) => {
  try {
    const item = await Service.findOne(req.params.id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const searchOne = async (req, res, next) => {
  try {
    const item = await Service.searchOne(req.params.ipaddress);
    if (item) {
      res.status(200).json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const createOne = async (req, res, next) => {
  try {
    const item = await Service.createOne({ ...req.body });
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const item = await Service.updateOne(req.params.id, {
      ...req.body
    });
    if (item) {
      res.status(200).json(item);
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

module.exports = {
  searchOne,
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};

const Service = require('../services/inspector.service');

const findAll = async (req, res, next) => {
  try {
    const items = await Service.findAll();
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

const createOne = async (req, res, next) => {
  try {
    const ipaddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    await Service.createOne({
      host: ipaddress,
      [req.query.field]:
        req.query.type === 'object'
          ? req.body[req.query.field][0]
          : req.body[req.query.field]
    });
    res.status(200).end();
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
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};

const Service = require('../services/logger.service');

const findAll = async (req, res, next) => {
  try {
    const items = await Service.findAll(req.query);
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
};

const removeAll = async (req, res, next) => {
  try {
    const item = await Service.removeAll();
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
  removeAll
};

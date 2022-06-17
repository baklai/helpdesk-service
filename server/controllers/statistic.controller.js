const Service = require('../services/statistic.service');

const ipaddress = async (req, res, next) => {
  try {
    const item = await Service.ipaddress();
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const request = async (req, res, next) => {
  try {
    const item = await Service.request();
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const inspector = async (req, res, next) => {
  try {
    const item = await Service.inspector();
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const onmap = async (req, res, next) => {
  try {
    const item = await Service.onmap();
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

const dashboard = async (req, res, next) => {
  try {
    const item = await Service.dashboard();
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

module.exports = { ipaddress, request, inspector, onmap, dashboard };

const Enterprise = require('../models/enterprise.model');

const findAll = async () => {
  return Enterprise.find({});
};

const findOne = async (id) => {
  return Enterprise.findById(id);
};

const createOne = async (data) => {
  return Enterprise.create(data);
};

const updateOne = async (id, data) => {
  return Enterprise.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Enterprise.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

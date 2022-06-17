const Position = require('../models/position.model');

const findAll = async () => {
  return Position.find({});
};

const findOne = async (id) => {
  return Position.findById(id);
};

const createOne = async (data) => {
  return Position.create(data);
};

const updateOne = async (id, data) => {
  return Position.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Position.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

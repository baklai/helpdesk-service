const Location = require('../models/location.model');

const findAll = async () => {
  return Location.find({});
};

const findOne = async (id) => {
  return Location.findById(id);
};

const createOne = async (data) => {
  return Location.create(data);
};

const updateOne = async (id, data) => {
  return Location.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Location.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

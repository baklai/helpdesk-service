const Unit = require('../models/unit.model');

const findAll = async () => {
  return Unit.find({});
};

const findOne = async (id) => {
  return Unit.findById(id);
};

const createOne = async (data) => {
  return Unit.create(data);
};

const updateOne = async (id, data) => {
  return Unit.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Unit.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

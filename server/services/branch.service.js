const Branch = require('../models/branch.model');

const findAll = async () => {
  return Branch.find({});
};

const findOne = async (id) => {
  return Branch.findById(id);
};

const createOne = async (data) => {
  return Branch.create(data);
};

const updateOne = async (id, data) => {
  return Branch.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Branch.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

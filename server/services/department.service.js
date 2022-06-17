const Department = require('../models/department.model');

const findAll = async () => {
  return Department.find({});
};

const findOne = async (id) => {
  return Department.findById(id);
};

const createOne = async (data) => {
  return Department.create(data);
};

const updateOne = async (id, data) => {
  return Department.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Department.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

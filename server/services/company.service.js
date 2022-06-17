const Сompany = require('../models/company.model');

const findAll = async () => {
  return Сompany.find({});
};

const findOne = async (id) => {
  return Сompany.findById(id);
};

const createOne = async (data) => {
  return Сompany.create(data);
};

const updateOne = async (id, data) => {
  return Сompany.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Сompany.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

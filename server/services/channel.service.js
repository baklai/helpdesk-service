const Channel = require('../models/channel.model');

const findAll = async () => {
  return Channel.find({});
};

const findOne = async (id) => {
  return Channel.findById(id);
};

const createOne = async (data) => {
  return Channel.create(data);
};

const updateOne = async (id, data) => {
  return Channel.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Channel.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

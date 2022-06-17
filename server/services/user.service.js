const User = require('../models/user.model');

const findOneByLogin = async (login) => {
  return User.findOne({ login });
};

const findAll = async () => {
  return User.find({});
};

const findOne = async (id) => {
  return User.findById(id);
};

const createOne = async (data) => {
  return User.create(data);
};

const updateOne = async (id, data) => {
  return User.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return User.deleteOne({ _id: id });
};

module.exports = {
  findOneByLogin,
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};

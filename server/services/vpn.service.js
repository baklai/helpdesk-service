const VPN = require('../models/vpn.model');

const findAll = async () => {
  return VPN.find({});
};

const findOne = async (id) => {
  return VPN.findById(id);
};

const createOne = async (data) => {
  return VPN.create(data);
};

const updateOne = async (id, data) => {
  return VPN.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return VPN.deleteOne({ _id: id });
};

module.exports = {
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};

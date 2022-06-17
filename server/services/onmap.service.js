const ONMAP = require('../models/onmap.model');

const mongoose = require('mongoose');

const findAll = async (userID) => {
  return await ONMAP.aggregate([
    {
      $match: {
        userID: { $in: [null, mongoose.Types.ObjectId(userID)] }
      }
    },
    {
      $addFields: {
        id: '$_id',
        updated: '$updatedAt',
        public: {
          $cond: { if: { $eq: ['$userID', null] }, then: true, else: false }
        }
      }
    },
    {
      $project: {
        _id: 0,
        id: 1,
        title: 1,
        target: 1,
        updated: 1,
        public: 1
      }
    },
    {
      $sort: {
        updated: -1
      }
    }
  ]).allowDiskUse(true);
};

const findOne = async (id) => {
  return ONMAP.findById(id);
};

const createOne = async (data) => {
  return ONMAP.create(data);
};

const removeOne = async (id) => {
  return (await ONMAP.deleteOne({ _id: id })).deletedCount;
};

module.exports = { findAll, findOne, createOne, removeOne };

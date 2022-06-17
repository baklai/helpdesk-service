const Notification = require('../models/notification.model');

const findAll = async (id) => {
  return Notification.find({ userID: id });
};

const createMany = async (data) => {
  const { title, text, users } = data;
  await users.forEach((el) => {
    Notification.create({
      title,
      text,
      userID: el
    });
  });

  return;
};

const removeOne = async (id, userID) => {
  return Notification.deleteOne({ _id: id, userID: userID });
};

module.exports = { findAll, createMany, removeOne };

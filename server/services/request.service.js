const Request = require('../models/request.model');

const findAll = async (query) => {
  const o = Object.assign({}, JSON.parse(query.options));
  const f = Object.assign({}, JSON.parse(query.filters));

  let options = {};

  options.page = o.page || 1;

  if (Number(o.itemsPerPage) === -1) {
    options.limit = await Request.countDocuments();
  } else {
    options.limit = Number(o.itemsPerPage);
  }

  options.lean = false;
  options.sort = '-createdAt'; // o.sortBy ? [o.sortBy, o.sortDesc] : 'createdAt';
  options.select = '';

  let filters = {};

  if (f.workerOpen) filters.workerOpen = f.workerOpen;
  if (f.workerClose) filters.workerClose = f.workerClose;
  if (f.location) filters.location = f.location;
  if (f.position) filters.position = f.position;
  if (f.company) filters.company = f.company;
  if (f.branch) filters.branch = f.branch;
  if (f.enterprise) filters.enterprise = f.enterprise;
  if (f.department) filters.department = f.department;
  if (f.ipaddress) filters.ipaddress = { $regex: f.ipaddress, $options: 'i' };
  if (f.fullname) filters.fullname = { $regex: f.fullname, $options: 'i' };
  if (f.phone) filters.phone = { $regex: f.phone, $options: 'i' };
  if (f.mail) filters.mail = { $regex: f.mail, $options: 'i' };
  if (f.closed) filters.closed = { $ne: null };

  return Request.paginate({ ...filters }, { ...options });
};

const findOne = async (id) => {
  return Request.findById(id);
};

const createOne = async (data) => {
  return Request.create(data);
};

const updateOne = async (id, data) => {
  return Request.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return Request.deleteOne({ _id: id });
};

module.exports = { findAll, findOne, createOne, updateOne, removeOne };

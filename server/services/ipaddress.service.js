const Netmask = require('netmask').Netmask;

const IPAddress = require('../models/ipaddress.model');

const findAll = async (query) => {
  const o = Object.assign({}, JSON.parse(query.options));
  const f = Object.assign({}, JSON.parse(query.filters));

  let options = {};

  options.page = o.page || 1;

  if (Number(o.itemsPerPage) === -1) {
    options.limit = await IPAddress.countDocuments();
  } else {
    options.limit = Number(o.itemsPerPage);
  }

  options.lean = false;
  options.sort = 'indexip'; // o.sortBy ? [o.sortBy, o.sortDesc] : 'indexip';
  options.select = '-cidr';

  let filters = {};

  if (f.unit) filters.unit = f.unit;
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
  if (f.autoanswer)
    filters.autoanswer = { $regex: f.autoanswer, $options: 'i' };

  if (f.internet) {
    filters['internet.mail'] = { $ne: null };
    filters['internet.dateOpen'] = { $ne: null };
    filters['internet.dateClose'] = null;
  }

  if (f.email) {
    filters['email.login'] = { $ne: null };
    filters['email.mail'] = { $ne: null };
    filters['email.dateOpen'] = { $ne: null };
    filters['email.dateClose'] = null;
  }

  return IPAddress.paginate({ ...filters }, { ...options });
};

const findOne = async (id) => {
  return IPAddress.findById(id);
};

const searchOne = async (ip) => {
  return IPAddress.findOne({ ipaddress: ip });
};

const createOne = async (data) => {
  data.indexip = new Netmask(data.ipaddress).netLong;
  return IPAddress.create(data);
};

const updateOne = async (id, data) => {
  data.indexip = new Netmask(data.ipaddress).netLong;
  return IPAddress.findByIdAndUpdate(id, { $set: { ...data } });
};

const removeOne = async (id) => {
  return IPAddress.deleteOne({ _id: id });
};

module.exports = {
  searchOne,
  findAll,
  findOne,
  createOne,
  updateOne,
  removeOne
};

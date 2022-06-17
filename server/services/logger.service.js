const Logger = require('../models/logger.model');

const findAll = async (query) => {
  const o = Object.assign({}, JSON.parse(query.options));
  const f = Object.assign({}, JSON.parse(query.filters));
  let options = {};
  options.page = o.page || 1;
  if (Number(o.itemsPerPage) === -1) {
    options.limit = await Logger.countDocuments();
  } else {
    options.limit = Number(o.itemsPerPage);
  }
  options.lean = false;
  options.sort = '-date';
  options.select = '';
  let filters = {};
  if (f.date) filters.date = { $regex: f.date, $options: 'i' };
  if (f.log) filters.log = { $regex: f.log, $options: 'i' };
  return Logger.paginate({ ...filters }, { ...options });
};

const removeAll = async () => {
  return Logger.deleteMany({});
};

module.exports = {
  findAll,
  removeAll
};

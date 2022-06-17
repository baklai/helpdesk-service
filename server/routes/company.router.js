const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/company.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('company'), Controller.findAll)
  .post(hasScope('company:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('company:get'), Controller.findOne)
  .put(hasScope('company:put'), Controller.updateOne)
  .delete(hasScope('company:delete'), Controller.removeOne);

module.exports = router;

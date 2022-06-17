const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/branch.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('branch'), Controller.findAll)
  .post(hasScope('branch:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('branch:get'), Controller.findOne)
  .put(hasScope('branch:put'), Controller.updateOne)
  .delete(hasScope('branch:delete'), Controller.removeOne);

module.exports = router;

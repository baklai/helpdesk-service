const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/enterprise.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('enterprise'), Controller.findAll)
  .post(hasScope('enterprise:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('enterprise:get'), Controller.findOne)
  .put(hasScope('enterprise:put'), Controller.updateOne)
  .delete(hasScope('enterprise:delete'), Controller.removeOne);

module.exports = router;

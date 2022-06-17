const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/unit.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('unit'), Controller.findAll)
  .post(hasScope('unit:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('unit:get'), Controller.findOne)
  .put(hasScope('unit:put'), Controller.updateOne)
  .delete(hasScope('unit:delete'), Controller.removeOne);

module.exports = router;

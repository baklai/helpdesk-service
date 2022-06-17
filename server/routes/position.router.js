const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/position.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('position'), Controller.findAll)
  .post(hasScope('position:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('position:get'), Controller.findOne)
  .put(hasScope('position:put'), Controller.updateOne)
  .delete(hasScope('position:delete'), Controller.removeOne);

module.exports = router;

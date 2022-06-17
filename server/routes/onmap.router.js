const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/onmap.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('onmap'), Controller.findAll)
  .post(hasScope('onmap:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('onmap:get'), Controller.findOne)
  .put(hasScope('onmap:put'), Controller.updateOne)
  .delete(hasScope('onmap:delete'), Controller.removeOne);

module.exports = router;

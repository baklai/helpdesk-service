const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/request.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('request'), Controller.findAll)
  .post(hasScope('request:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('request:get'), Controller.findOne)
  .put(hasScope('request:put'), Controller.updateOne)
  .delete(hasScope('request:delete'), Controller.removeOne);

module.exports = router;

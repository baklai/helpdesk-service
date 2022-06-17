const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/location.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('location:get'), Controller.findAll)
  .post(hasScope('location:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('location:get'), Controller.findOne)
  .put(hasScope('location:put'), Controller.updateOne)
  .delete(hasScope('location:delete'), Controller.removeOne);

module.exports = router;

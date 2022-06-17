const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/channel.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('channel'), Controller.findAll)
  .post(hasScope('channel:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('channel:get'), Controller.findOne)
  .put(hasScope('channel:put'), Controller.updateOne)
  .delete(hasScope('channel:delete'), Controller.removeOne);

module.exports = router;

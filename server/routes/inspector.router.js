const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/inspector.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('inspector'), Controller.findAll)
  .post(Controller.createOne);

router
  .route('/:id')
  .get(hasScope('inspector:get'), Controller.findOne)
  .put(hasScope('inspector:put'), Controller.updateOne)
  .delete(hasScope('inspector:delete'), Controller.removeOne);

module.exports = router;

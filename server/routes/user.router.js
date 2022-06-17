const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/user.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('user'), Controller.findAll)
  .post(hasScope('user:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('user:get'), Controller.findOne)
  .put(hasScope('user:put'), Controller.updateOne)
  .delete(hasScope('user:delete'), Controller.removeOne);

module.exports = router;

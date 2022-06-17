const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/department.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('department'), Controller.findAll)
  .post(hasScope('department:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('department:get'), Controller.findOne)
  .put(hasScope('department:put'), Controller.updateOne)
  .delete(hasScope('department:delete'), Controller.removeOne);

module.exports = router;

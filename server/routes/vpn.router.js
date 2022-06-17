const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/vpn.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('vpn'), Controller.findAll)
  .post(hasScope('vpn:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('vpn:get'), Controller.findOne)
  .put(hasScope('vpn:put'), Controller.updateOne)
  .delete(hasScope('vpn:delete'), Controller.removeOne);

module.exports = router;

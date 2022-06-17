const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/ipaddress.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('ipaddress'), Controller.findAll)
  .post(hasScope('ipaddress:post'), Controller.createOne);

router
  .route('/:id')
  .get(hasScope('ipaddress:get'), Controller.findOne)
  .put(hasScope('ipaddress:put'), Controller.updateOne)
  .delete(hasScope('ipaddress:delete'), Controller.removeOne);

router
  .route('/search/:ipaddress')
  .get(hasScope('ipaddress:get'), Controller.searchOne);

module.exports = router;

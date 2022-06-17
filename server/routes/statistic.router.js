const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/statistic.controller');

const router = Router();

router
  .route('/ipaddress')
  .get(hasScope('statistic:ipaddress'), Controller.ipaddress);

router
  .route('/inspector')
  .get(hasScope('statistic:inspector'), Controller.inspector);

router.route('/request').get(hasScope('statistic:request'), Controller.request);

router.route('/onmap').get(hasScope('statistic:onmap'), Controller.onmap);

router
  .route('/dashboard')
  .get(hasScope('statistic:dashboard'), Controller.dashboard);

module.exports = router;

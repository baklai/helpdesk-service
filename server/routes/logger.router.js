const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/logger.controller');

const router = Router();

router
  .route('/')
  .get(hasScope('logger'), Controller.findAll)
  .delete(hasScope('logger'), Controller.removeAll);

module.exports = router;

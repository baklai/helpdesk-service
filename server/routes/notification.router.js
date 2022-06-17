const { Router } = require('express');
const hasScope = require('../middleware/scope');
const Controller = require('../controllers/notification.controller');

const router = Router();

router
  .route('/')
  .get(Controller.findAll)
  .post(hasScope('notification:post'), Controller.createMany);

router.route('/:id').delete(Controller.removeOne);

module.exports = router;

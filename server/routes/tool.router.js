const { Router } = require('express');
const Controller = require('../controllers/tool.controller');

const router = Router();

router.route('/inspector').get(Controller.getInspector);

router.route('/rdp').get(Controller.getRDP);

router.route('/vnc').get(Controller.getVNC);

router.route('/ping').get(Controller.getPING);

router.route('/ping-online').get(Controller.getOPING);

module.exports = router;

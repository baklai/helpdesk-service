const { Router } = require('express');
const Controller = require('../controllers/auth.controller');

const router = Router();

router.post('/signin', Controller.signin);

router.get('/me', Controller.me);

module.exports = router;

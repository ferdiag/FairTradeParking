const express = require('express');
const router = express.Router();

const createQrCode = require('../controllers/createQrCode');
const register = require('../controllers/register');
const login = require('../controllers/login');
const bookingSlots = require('../controllers/bookingSlots');
const veryfyJWT = require('../middleware/veryfyJWT');
const createEvent = require('../controllers/createEvent');
const init = require('../controllers/init');

router.get('/', init);
router.post('/createQrCode', createQrCode);
router.post('/register', register);
router.post('/login', login);
router.post('/bookingSlots', bookingSlots);
router.post('/createEvent', createEvent);

module.exports = router;

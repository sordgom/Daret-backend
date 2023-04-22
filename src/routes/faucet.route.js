const express = require('express');
const router = express.Router();
const faucetController = require('../controllers/faucet.controller');

/* POST daret */
router.post('/', faucetController.mine);

module.exports = router;

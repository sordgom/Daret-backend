const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');

/* GET campaign . */
router.get('/', campaignController.get);
router.get('/address/:address', campaignController.getByAddress);
router.get('/user/:user', campaignController.getByUser);

/* POST campaign  */
router.post('/', campaignController.create);

/* PUT campaign  */
router.put('/:address', campaignController.update);

/* DELETE campaign  */
router.delete('/:id', campaignController.remove);

module.exports = router;

const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaign.controller');

/* GET campaign . */
router.get('/', campaignController.get);
  
/* POST campaign  */
router.post('/', campaignController.create);

/* PUT campaign  */
router.put('/:id', campaignController.update);

/* DELETE campaign  */
router.delete('/:id', campaignController.remove);

module.exports = router;
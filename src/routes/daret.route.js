const express = require('express');
const router = express.Router();
const daretController = require('../controllers/daret.controller');

/* GET daret. */
router.get('/', daretController.get);
  
/* POST daret */
router.post('/', daretController.create);

/* PUT daret  */
router.put('/:id', daretController.update);

/* DELETE daret  */
router.delete('/:id', daretController.remove);

module.exports = router;

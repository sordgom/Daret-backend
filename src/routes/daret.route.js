const express = require('express');
const router = express.Router();
const daretController = require('../controllers/daret.controller');

/* GET programming languages. */
router.get('/', daretController.get);
  
/* POST programming language */
router.post('/', daretController.create);

/* PUT programming language */
router.put('/:id', daretController.update);

/* DELETE programming language */
router.delete('/:id', daretController.remove);

module.exports = router;

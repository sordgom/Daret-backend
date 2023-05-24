const express = require('express');
const router = express.Router();
const daretController = require('../controllers/daret.controller');
const daretInviteController = require('../controllers/daretInvite.controller');

/* GET daret. */
router.get('/', daretController.get2);
router.get('/address/:address', daretController.getByAddress);
router.get('/user/:user', daretController.getByUser);

/* POST daret */
router.post('/', daretController.create);

/* PUT daret  */
router.put('/:address', daretController.update);

/* DELETE daret  */
router.delete('/:id', daretController.remove);

// New route for daret_invite
router.post('/invite', daretInviteController.create);
router.get('/invitees/:daretId', daretInviteController.getInvitees); // Add this line

module.exports = router;

const daretInviteService = require('../services/daretInvite.service');

async function create(req, res, next) {
  try {
    const daretInviteData = {
      daret_id: req.body.daret_id,
      invitees: req.body.invitees,
    };
    res.json(await daretInviteService.create(daretInviteData));
  } catch (err) {
    console.error(`Error while creating daret invite`, err.message);
    next(err);
  }
}

async function getInvitees(req, res, next) {
    try {
      const daretId = req.params.daretId;
      res.json(await daretInviteService.getInviteesByDaretId(daretId));
    } catch (err) {
      console.error(`Error while getting invitees by daret id`, err.message);
      next(err);
    }
  }
  

module.exports = {
  create,
  getInvitees
};
const db = require('./db.service');
const helper = require('../utils/helper.util');

async function create(daretInvite) {
  const daretInviteResult = await db.query(
    `INSERT INTO daret_invite 
    (daret_id) 
    VALUES 
    ($1) RETURNING id`,
    [daretInvite.daret_id]
  );

  let message = 'Error in creating daret invite';

  if (daretInviteResult.length) {
    const daretInviteId = daretInviteResult[0].id;
    for (const inviteeAddress of daretInvite.invitees) {
      await db.query(
        `INSERT INTO invitee 
        (daret_invite_id, address) 
        VALUES 
        ($1, $2)`,
        [daretInviteId, inviteeAddress]
      );
    }
    message = 'Daret invite and invitees created successfully';
  }

  return { message };
}

async function getInviteesByDaretId(daretId) {
  const rows = await db.query(
    `SELECT i.address
     FROM invitee i
     JOIN daret_invite di ON i.daret_invite_id = di.id
     WHERE di.daret_id = $1`,
    [daretId]
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

module.exports = {
  create,
  getInviteesByDaretId,
};

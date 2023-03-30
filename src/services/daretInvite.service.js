const db = require('./db.service');
const helper = require('../utils/helper.util');

async function create(daretInvite) {
  const daretInviteResult = await db.query(
    `INSERT INTO daret_invite 
    (daret_id) 
    VALUES 
    (?)`,
    [daretInvite.daret_id]
  );

  let message = 'Error in creating daret invite';

  if (daretInviteResult.affectedRows) {
    const daretInviteId = daretInviteResult.insertId;
    for (const inviteeAddress of daretInvite.invitees) {
      await db.query(
        `INSERT INTO invitee 
        (daret_invite_id, address) 
        VALUES 
        (?, ?)`,
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
       WHERE di.daret_id = ?`,
      [daretId]
    );
    const data = helper.emptyOrRows(rows);
    return data;
  }

module.exports = {
  create,
  getInviteesByDaretId
};

const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM daret LIMIT ${offset} , ${config.listPerPage};`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getMultiple2(page = 1, userAddress = null) {
  const offset = helper.getOffset(page, config.listPerPage);
  
  let query = `SELECT * FROM daret`;
  const queryParams = [];

  if (userAddress) {
    query += ` WHERE id IN (
      SELECT daret_invite.daret_id
      FROM daret_invite
      JOIN invitee ON daret_invite.id = invitee.daret_invite_id
      WHERE invitee.address = ?
    ) OR invitation_required = 1`;
    queryParams.push(userAddress);
  }

  const rows = await db.query(query, queryParams);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function getByAddress(address) {
  const rows = await db.query(
    'SELECT * FROM daret WHERE address = ?',
    [address]
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function create(daret){
  const result = await db.query(
    `INSERT INTO daret 
    (title, description, creator, completed, address, invitation_required) 
    VALUES 
    (?, ?, ?, ?, ?, ?)`, 
    [
      daret.title,
      daret.description,
      daret.creator,
      daret.completed,
      daret.address,
      daret.invitation_required
    ]
  );

  let message = 'Error in creating daret';

  if (result.affectedRows) {
    message = 'Daret created successfully';
    
  }

  return {message, id: result.insertId };
}

async function update(id, daret){
  const result = await db.query(
    `UPDATE daret 
    SET title=?, description=?, creator=?, completed=?, address=?
    WHERE id=?`,
    [
      daret.title,
      daret.description,
      daret.creator,
      daret.completed,
      daret.address,
      id
    ]
  );

  let message = 'Error in updating daret';

  if (result.affectedRows) {
    message = 'Daret updated successfully';
  }

  return {message};
}

async function updateCompleted(address, daret){
  console.log(daret)
  const result = await db.query(
    `UPDATE daret 
    SET completed=?
    WHERE address=?`,
    [
      daret.completed,
      address
    ]
  );  
  
  let message = 'Error in updating daret';

  if (result.affectedRows) {
    message = 'daret updated successfully';
  }

  return {message};
  }
async function remove(id) {
  const result = await db.query(
    `DELETE FROM daret WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting Daret';

  if (result.affectedRows) {
    message = 'Daret deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  getMultiple2,
  create,
  update,
  remove,
  getByAddress,
  updateCompleted, // Add this line
}
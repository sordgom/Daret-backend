const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM daret OFFSET ${offset} LIMIT ${config.listPerPage};`,
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
      WHERE invitee.address = $1
    ) OR invitation_required = TRUE`;
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
    'SELECT * FROM daret WHERE address = $1',
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
    ($1, $2, $3, $4, $5, $6) RETURNING id`, 
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

  if (result.rowCount) {
    message = 'Daret created successfully';
    
  }

  return {message, id: result.rows[0].id };
}

async function update(id, daret){
  const result = await db.query(
    `UPDATE daret 
    SET title=$1, description=$2, creator=$3, completed=$4, address=$5
    WHERE id=$6`,
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

  if (result.rowCount) {
    message = 'Daret updated successfully';
  }

  return {message};
}

async function updateCompleted(address, daret){
  console.log(daret)
  const result = await db.query(
    `UPDATE daret 
    SET completed=$1
    WHERE address=$2`,
    [
      daret.completed,
      address
    ]
  );  
  
  let message = 'Error in updating daret';

  if (result.rowCount) {
    message = 'daret updated successfully';
  }

  return {message};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM daret WHERE id=$1`, 
    [id]
  );

  let message = 'Error in deleting Daret';

  if (result.rowCount) {
    message = 'Daret deleted successfully';
  }

  return {message};
}

module.exports={
  getMultiple,
  getMultiple2,
  create,
  update,
  remove,
  getByAddress,
  updateCompleted, // Add this line
}
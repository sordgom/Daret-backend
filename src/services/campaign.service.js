const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM campaign OFFSET ${offset} LIMIT ${config.listPerPage}`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getByAddress(address) {
  const rows = await db.query(
    'SELECT * FROM campaign WHERE address = $1',
    [address]
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function getByUser(user) {
  const rows = await db.query(
    'SELECT * FROM campaign WHERE creator = $1',
    [user]
  );
  const data = helper.emptyOrRows(rows);
  return data;
}

async function create(campaign){
  const result = await db.query(
    `INSERT INTO campaign 
    (title, description, creator, completed, address) 
    VALUES 
    ($1, $2, $3, $4, $5)`, 
    [
      campaign.title,
      campaign.description,
      campaign.creator,
      campaign.completed,
      campaign.address,
    ]
  );

  let message = 'Error in creating campaign';

  if (result.rowCount) {
    message = 'campaign created successfully';
  }

  return {message};
}
  
async function update(id, campaign){
  const result = await db.query(
    `UPDATE campaign 
    SET title=$1, description=$2, creator=$3, completed=$4, address=$5
    WHERE id=$6`,
    [
      campaign.title,
      campaign.description,
      campaign.creator,
      campaign.completed,
      campaign.address,
      id
    ]
  );
  

  let message = 'Error in updating campaign';

  if (result.length) {
    message = 'campaign updated successfully';
  }

  return {message};
}

async function updateCompleted(address, campaign){
  const result = await db.query(
    `UPDATE campaign 
    SET completed=$1
    WHERE address=$2`,
    [
      campaign.completed,
      address
    ]
  );
  

  let message = 'Error in updating campaign';

  if (result.rowCount) {
    message = 'campaign updated successfully';
  }

  return {message};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM campaign WHERE id=$1`, 
    [id]
  );

  let message = 'Error in deleting campaign';

  if (result.rowCount) {
    message = 'campaign deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  updateCompleted,
  remove,
  getByUser,
  getByAddress // Add this line
}

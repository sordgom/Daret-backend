const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM campaign LIMIT ${offset} , ${config.listPerPage} ;`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(campaign){
  const result = await db.query(
    `INSERT INTO campaign 
    (address) 
    VALUES 
    (?)`, 
    [
      campaign.address,
    ]
  );

  let message = 'Error in creating campaign';

  if (result.affectedRows) {
    message = 'campaign created successfully';
  }

  return {message};
}

async function update(id, campaign){
  const result = await db.query(
    `UPDATE campaign 
    SET id=?, address=?`, 
    [
      campaign.id, campaign.address, id
    ]
  );

  let message = 'Error in updating campaign';

  if (result.affectedRows) {
    message = 'campaign updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM campaign WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting campaign';

  if (result.affectedRows) {
    message = 'campaign deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}

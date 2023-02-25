const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/general.config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT *
    FROM daret LIMIT ${offset} , ${config.listPerPage} ;`,
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(daret){
  const result = await db.query(
    `INSERT INTO daret 
    (address) 
    VALUES 
    (?)`, 
    [
      daret.address,
    ]
  );

  let message = 'Error in creating daret';

  if (result.affectedRows) {
    message = 'Daret created successfully';
  }

  return {message};
}

async function update(id, daret){
  const result = await db.query(
    `UPDATE daret 
    SET id=?, address=?`, 
    [
      daret.id, daret.address, id
    ]
  );

  let message = 'Error in updating daret';

  if (result.affectedRows) {
    message = 'Daret updated successfully';
  }

  return {message};
}

async function remove(address){
  const result = await db.query(
    `DELETE FROM daret WHERE address=?`, 
    [address]
  );

  let message = 'Error in deleting Daret';

  if (result.affectedRows) {
    message = 'Daret deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}

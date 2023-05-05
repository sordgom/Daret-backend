const { Pool } = require('pg');
const dbConfig = require('../configs/db.config');

const pool = new Pool(dbConfig);

async function query(sql, params) {
  const { rows } = await pool.query(sql, params);
  return rows;
}

module.exports = {
  query
}
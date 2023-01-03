const daret = require('../services/daret.service');

async function get(req, res, next) {
  try {
      res.json(await daret.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting darets`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await daret.create(req.body));
  } catch (err) {
    console.error(`Error while creating darets`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await daret.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating darets`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await daret.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting darets`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};

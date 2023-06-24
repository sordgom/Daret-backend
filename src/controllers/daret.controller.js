const daret = require('../services/daret.service');

async function get(req, res, next) {
  try {
    res.json(await daret.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting darets`, err.message);
    next(err);
  }
}

async function get2(req, res, next) {
  try {
    const userAddress = req.query.userAddress || null;
    res.json(await daret.getMultiple2(req.query.page, userAddress));
  } catch (err) {
    console.error(`Error while getting darets`, err.message);
    next(err);
  }
}

async function getByAddress(req, res, next) {
  try {
    res.json(await daret.getByAddress(req.params.address));

  } catch (err) {
    console.error(`Error while getting daret by address`, err.message);
    next(err);
  }
}

async function getByUser(req, res, next) {
  try {
    res.json(await daret.getByUser(req.params.user));

  } catch (err) {
    console.error(`Error while getting daret by user`, err.message);
    next(err);
  }
}

async function getByCreator(req, res, next) {
  try {
    res.json(await daret.getByCreator(req.params.user));

  } catch (err) {
    console.error(`Error while getting daret by user`, err.message);
    next(err);
  }
}


async function create(req, res, next) {
  try {
    const daretData = {
      title: req.body.title,
      description: req.body.description,
      creator: req.body.creator,
      completed: req.body.completed,
      address: req.body.address,
      invitation_required: req.body.invitation_required
    };
    res.json(await daret.create(daretData));
  } catch (err) {
    console.error(`Error while creating daret`, err.message);
    next(err);
  }
}


async function update(req, res, next) {
  try {
      res.json(await daret.updateCompleted(req.params.address, req.body));
  } catch (err) {
    console.error(`Error while updating daret`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await daret.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting daret`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  get2,
  create,
  update,
  remove,
  getByUser,
  getByCreator,
  getByAddress // Add this line
};
const campaign = require('../services/campaign.service');

async function get(req, res, next) {
  try {
      res.json(await campaign.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting campaigns`, err.message);
      next(err);
  }
}

async function create(req, res, next) {
  try {
    res.json(await campaign.create(req.body));
  } catch (err) {
    console.error(`Error while creating campaigns`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await campaign.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating campaigns`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await campaign.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting campaigns`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};

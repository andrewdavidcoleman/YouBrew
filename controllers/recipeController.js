const db = require("../models");

// Defining methods for recipe controller
module.exports = {
  findAll: function(req, res) {
    db.Recipe
      .find(req.query)
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Recipe
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByStyle: function(req, res) {
    db.Recipe
      .find(req.params.style)
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Recipe
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Recipe
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateVol: function(req, res) {
    db.Recipe
      .findOneAndUpdate(
        { _id: req.params.id }, 
        { $inc: { availVol: req.params.vol }})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateRecipeVolByName: function(req, res) {
    db.Recipe
      .findOneAndUpdate(
        { name: decodeURI(req.params.name) },
        { $inc: { availVol: req.params.vol }},
        {upsert: true, returnNewDocument: true})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Recipe
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
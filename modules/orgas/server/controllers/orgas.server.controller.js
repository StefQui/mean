'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Orga = mongoose.model('Orga'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an orga
 */
exports.create = function (req, res) {
  var orga = new Orga(req.body);
  orga.user = req.user;

  orga.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orga);
    }
  });
};

exports.initOrga = function (req, res) {
  var orga = req.body.orga;
  req.session.orga = orga;
  if (orga) {
    console.log('initOrga:'+(orga.title));
  } else {
    console.log('initOrga with null');
  }
  res.json(orga);
};

/**
 * Show the current orga
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var orga = req.orga ? req.orga.toJSON() : {};

  // Add a custom field to the Orga, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Orga model.
  orga.isCurrentUserOwner = !!(req.user && orga.user && orga.user._id.toString() === req.user._id.toString());
  orga.isCurrentUserOwner = true;

  res.json(orga);
};

/**
 * Update an orga
 */
exports.update = function (req, res) {
  var orga = req.orga;

  orga.title = req.body.title;
  orga.shortName = req.body.shortName;
  orga.content = req.body.content;
  orga.operand = req.body.operand;
  orga.compiled = req.body.compiled;

  orga.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orga);
    }
  });
};

/**
 * Delete an orga
 */
exports.delete = function (req, res) {
  var orga = req.orga;

  orga.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orga);
    }
  });
};

/**
 * List of Orgas
 */
exports.list = function (req, res) {
  Orga.find().sort('-created').populate('user', 'displayName').exec(function (err, orgas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(orgas);
    }
  });
};

/**
 * Orga middleware
 */
exports.orgaByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Orga is invalid'
    });
  }

  Orga.findById(id).populate('user', 'displayName').exec(function (err, orga) {
    if (err) {
      return next(err);
    } else if (!orga) {
      return res.status(404).send({
        message: 'No orga with that identifier has been found'
      });
    }
    req.orga = orga;
    next();
  });
};

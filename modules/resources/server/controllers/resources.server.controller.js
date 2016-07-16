'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Resource = mongoose.model('Resource'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an resource
 */
exports.create = function (req, res) {
  var resource = new Resource(req.body);
  resource.user = req.user;

  resource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Show the current resource
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var resource = req.resource ? req.resource.toJSON() : {};

  // Add a custom field to the Resource, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Resource model.
  resource.isCurrentUserOwner = !!(req.user && resource.user && resource.user._id.toString() === req.user._id.toString());

  res.json(resource);
};

/**
 * Update an resource
 */
exports.update = function (req, res) {
  var resource = req.resource;

  resource.title = req.body.title;
  resource.content = req.body.content;
  resource.operand = req.body.operand;
  resource.compiled = req.body.compiled;

  resource.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * Delete an resource
 */
exports.delete = function (req, res) {
  var resource = req.resource;

  resource.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resource);
    }
  });
};

/**
 * List of Resources
 */
exports.list = function (req, res) {
  // console.log('camionnn='+JSON.stringify(req));
  Resource.find().sort('-created')
  // .where('title').equals(req.query.title)
  .populate('user', 'displayName').populate('template', 'title shortName').exec(function (err, resources) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(resources);
    }
  });
};

/**
 * Resource middleware
 */
exports.resourceByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Resource is invalid'
    });
  }

  Resource.findById(id).populate('user', 'displayName').populate('template', 'title shortName').exec(function (err, resource) {
    if (err) {
      return next(err);
    } else if (!resource) {
      return res.status(404).send({
        message: 'No resource with that identifier has been found'
      });
    }
    req.resource = resource;
    next();
  });
};

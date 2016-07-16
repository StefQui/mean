'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Template = mongoose.model('Template'),
  Orga = mongoose.model('Orga'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an template
 */
exports.create = function (req, res) {
  console.log('save template');
  var template = new Template(req.body);
  template.user = req.user;

  Orga.findById(req.session.orga._id).exec(function (err, orga) {
    template.orga = orga;
    template.save(function (err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log('push template in orga'+template._id);
        // orga.templates.push(template);
        // orga.save();
        res.json(template);
      }
    });
  });
};

/**
 * Show the current template
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var template = req.template ? req.template.toJSON() : {};

  // Add a custom field to the Template, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Template model.
  template.isCurrentUserOwner = true;

  res.json(template);
};

/**
 * Update an template
 */
exports.update = function (req, res) {
  var template = req.template;


  template.title = req.body.title;
  template.shortName = req.body.shortName;
  template.content = req.body.content;
  template.operand = req.body.operand;
  template.compiled = req.body.compiled;

  template.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      // console.log('push template in orga'+template._id);
      // orga.templates.push(template);
      // orga.save();
      res.json(template);
    }
  });
};

/**
 * Delete an template
 */
exports.delete = function (req, res) {
  var template = req.template;

  template.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(template);
    }
  });
};

/**
 * List of Templates
 */
exports.list = function (req, res) {
  console.log('list templates'+req.session.orga.title+' '+req.session.orga._id);
  // var id1 = mongoose.Types.ObjectId('574b5cf7403393bcba75315f');  // eslint-disable-line

  // {$in : [ObjectId("563e3337e2bf6c431b297d41")
  Orga.findById(req.session.orga._id).exec(function (err, orga) {
    console.log('orga found'+orga.title+' '+orga._id);
    Template.find({ 'orga': req.session.orga._id }).populate('orga').sort('-created').populate('user', 'displayName').populate('orga', 'title').exec(function (err, templates) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log('foiunde templates:'+templates.length);
        res.json(templates);
      }
    });
  });


  // Template.find({ 'orga.id': '574b5cf7403393bcba75315f' }).sort('-created').populate('user', 'displayName').populate('orga', 'title').exec(function (err, templates) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(templates);
  //   }
  // });
  // Template.find().where('orga', id1).sort('-created').populate('user', 'displayName').populate('orga', 'title').exec(function (err, templates) {
  //   if (err) {
  //     return res.status(400).send({
  //       message: errorHandler.getErrorMessage(err)
  //     });
  //   } else {
  //     res.json(templates);
  //   }
  // });
};

/**
 * Template middleware
 */
exports.templateByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Template is invalid'
    });
  }

  Template.findById(id).populate('user', 'displayName').populate('orga', 'title').exec(function (err, template) {
    if (err) {
      return next(err);
    } else if (!template) {
      return res.status(404).send({
        message: 'No template with that identifier has been found'
      });
    }
    req.template = template;
    next();
  });
};

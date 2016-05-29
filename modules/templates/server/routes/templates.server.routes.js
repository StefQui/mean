'use strict';

/**
 * Module dependencies
 */
var TemplatesPolicy = require('../policies/templates.server.policy'),
  templates = require('../controllers/templates.server.controller');

module.exports = function (app) {
  // Templates collection routes
  app.route('/api/templates').all(TemplatesPolicy.isAllowed)
    .get(templates.list)
    .post(templates.create);

  // Single template routes
  app.route('/api/templates/:templateId').all(TemplatesPolicy.isAllowed)
    .get(templates.read)
    .put(templates.update)
    .delete(templates.delete);

  // Finish by binding the template middleware
  app.param('templateId', templates.templateByID);
};

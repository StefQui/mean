'use strict';

/**
 * Module dependencies
 */
var orgasPolicy = require('../policies/orgas.server.policy'),
  orgas = require('../controllers/orgas.server.controller');

module.exports = function (app) {
  // Orgas collection routes
  app.route('/api/orgas').all(orgasPolicy.isAllowed)
    .get(orgas.list)
    .post(orgas.create);

  app.route('/api/initOrga').all(orgasPolicy.isAllowed)
    .post(orgas.initOrga);

  // Single orga routes
  app.route('/api/orgas/:orgaId').all(orgasPolicy.isAllowed)
    .get(orgas.read)
    .put(orgas.update)
    .delete(orgas.delete);

  // Finish by binding the orga middleware
  app.param('orgaId', orgas.orgaByID);
};

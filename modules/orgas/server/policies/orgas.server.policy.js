'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Orgas Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/orgas',
      permissions: '*'
    }, {
      resources: '/api/orgas/:orgaId',
      permissions: '*'
    }, {
      resources: '/api/initOrga',
      permissions: ['post']
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/orgas',
      permissions: ['get', 'post']
    }, {
      resources: '/api/orgas/:orgaId',
      permissions: ['get']
    }, {
      resources: '/api/initOrga',
      permissions: ['post']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/orgas',
      permissions: ['get']
    }, {
      resources: '/api/orgas/:orgaId',
      permissions: ['get']
    }, {
      resources: '/api/initOrga',
      permissions: ['post']
    }]
  }]);
};

/**
 * Check If Orgas Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an orga is being processed and the current user created it then allow any manipulation
  if (req.orga && req.user && req.orga.user && req.orga.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};

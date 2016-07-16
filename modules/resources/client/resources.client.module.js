(function (app) {
  'use strict';

  app.registerModule('resources', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('resources.services');
  // app.registerModule('resources.routes', ['ui.router', 'core.routes', 'resources.services']);
}(ApplicationConfiguration));
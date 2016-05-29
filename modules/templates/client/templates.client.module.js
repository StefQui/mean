(function (app) {
  'use strict';

  app.registerModule('templates', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('templates.services');
  app.registerModule('templates.routes', ['ui.router', 'core.routes', 'templates.services']);
}(ApplicationConfiguration));

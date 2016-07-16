(function (app) {
  'use strict';

  app.registerModule('orgas', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('orgas.services');
  app.registerModule('orgas.routes', ['ui.router', 'core.routes', 'orgas.services']);
}(ApplicationConfiguration));

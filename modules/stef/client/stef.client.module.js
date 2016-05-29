(function (app) {
  'use strict';

  app.registerModule('stef', ['core']);
  app.registerModule('stef.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));


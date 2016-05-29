(function () {
  'use strict';

  angular
    .module('stef.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stef', {
        url: '/stef',
        templateUrl: 'modules/stef/client/views/stef.client.view.html',
        controller: 'StefController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Stef'
        }
      });
  }
}());

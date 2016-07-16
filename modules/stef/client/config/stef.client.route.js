(function () {
  'use strict';

  angular
    .module('stef.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('stef', {
        abstract: true,
        url: '/org/:orgaShortName/stef',
        // template: '',
        templateUrl: 'modules/orgas/client/views/orga-container.html',
        controller: 'OrgaUrlController'
        // ,
          // $scope.hello='hello2';
          // $scope.contacts = [{ id:0, name: "Alice" }, { id:1, name: "Bob" }];
        // }
      })
      .state('stef.go', {
        url: '/go',
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

(function () {
  'use strict';

  angular
    .module('chat.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('chat', {
        abstract: true,
        url: '/org/:orgaShortName/chat',
        // template: '',
        templateUrl: 'modules/orgas/client/views/orga-container.html',
        controller: 'OrgaUrlController'
        // ,
          // $scope.hello='hello2';
          // $scope.contacts = [{ id:0, name: "Alice" }, { id:1, name: "Bob" }];
        // }
      })
      .state('chat.go', {
        url: '',
        templateUrl: 'modules/chat/client/views/chat.client.view.html',
        controller: 'ChatController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Chat'
        }
      });
  }
}());

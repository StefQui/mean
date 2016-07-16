(function () {
  'use strict';

  angular
    .module('orgas.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('orgas', {
        abstract: true,
        url: '/orgas',
        template: '<ui-view/>',
        controller: 'OrgaUrlController'
      })
      .state('orgas.list', {
        url: '',
        templateUrl: 'modules/orgas/client/views/list-orgas.client.view.html',
        controller: 'OrgasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Orgas List'
        }
      })
      .state('orgas.create', {
        url: '/create',
        templateUrl: 'modules/orgas/client/views/form-orga.client.view.html',
        controller: 'OrgasController',
        controllerAs: 'vm',
        resolve: {
          orgaResolve: newOrga
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Orgas Create'
        }
      })
      .state('orgas.edit', {
        url: '/:orgaId/edit',
        templateUrl: 'modules/orgas/client/views/form-orga.client.view.html',
        controller: 'OrgasController',
        controllerAs: 'vm',
        resolve: {
          orgaResolve: getOrga
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Orga {{ orgaResolve.title }}'
        }
      })
      .state('orgas.view', {
        url: '/:orgaId',
        templateUrl: 'modules/orgas/client/views/view-orga.client.view.html',
        controller: 'OrgasController',
        controllerAs: 'vm',
        resolve: {
          orgaResolve: getOrga
        },
        data: {
          pageTitle: 'Orga {{ orgaResolve.title }}'
        }
      });
  }

  getOrga.$inject = ['$stateParams', 'OrgasService'];

  function getOrga($stateParams, OrgasService) {
    return OrgasService.getResource().get({
      orgaId: $stateParams.orgaId
    }).$promise;
  }

  newOrga.$inject = ['OrgasService'];

  function newOrga(OrgasService) {
    return new (OrgasService.getResource());
  }
}());

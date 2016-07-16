(function () {
  'use strict';

  angular
    .module('templates.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      // .state('stef', {
      //   abstract: true,
      //   url: '/org/:orgaShortName/stef',
      //   // template: '',
      //   templateUrl: 'modules/orgas/client/views/orga-container.html',
      //   controller: 'OrgaUrlController'
      //   // ,
      //     // $scope.hello='hello2';
      //     // $scope.contacts = [{ id:0, name: "Alice" }, { id:1, name: "Bob" }];
      //   // }
      // })
      .state('templates', {
        abstract: true,
        url: '/org/:orgaShortName/templates',
        templateUrl: 'modules/orgas/client/views/orga-container.html',
        controller: 'OrgaUrlController'
      })
      .state('templates.list', {
        url: '',
        templateUrl: 'modules/templates/client/views/list-templates.client.view.html',
        controller: 'TemplatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Templates List'
        }
      })
      .state('templates.create', {
        url: '/create',
        templateUrl: 'modules/templates/client/views/form-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: newTemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Templates Create'
        }
      })
      .state('templates.edit', {
        url: '/:templateId/edit',
        templateUrl: 'modules/templates/client/views/form-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: getTemplate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Template {{ templateResolve.title }}'
        }
      })
      .state('templates.view', {
        url: '/:templateId',
        templateUrl: 'modules/templates/client/views/view-template.client.view.html',
        controller: 'TemplatesController',
        controllerAs: 'vm',
        resolve: {
          templateResolve: getTemplate
        },
        data: {
          pageTitle: 'Template {{ templateResolve.title }}'
        }
      });
  }

  getTemplate.$inject = ['$stateParams', 'TemplatesService'];

  function getTemplate($stateParams, TemplatesService) {
    return TemplatesService.getResource().get({
      templateId: $stateParams.templateId
    }).$promise;
  }

  newTemplate.$inject = ['TemplatesService', 'OrgasService'];

  function newTemplate(TemplatesService, OrgasService) {
    var res = new (TemplatesService.getResource());
    console.log('OrgasService.getCurrentOrga()=='+OrgasService.getCurrentOrga());
    // res.orga = OrgasService.getCurrentOrga();
    return res;
  }
}());

(function () {
  'use strict';

  angular
    .module('resources.services')
    .factory('ResourcesService', ArticlesService);

  ArticlesService.$inject = ['$resource'];

  function ArticlesService($resource) {
    return $resource('api/resources/:resourceId', {
      resourceId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      filtered: {
        method: 'GET', 'params': '@params', isArray: true }
    });
  }
}());
(function () {
  'use strict';

  angular
    .module('templates.services')
    .factory('TemplatesService', TemplatesService);

  TemplatesService.$inject = ['$resource'];

  function TemplatesService($resource) {
    return $resource('api/templates/:templateId', {
      templateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());

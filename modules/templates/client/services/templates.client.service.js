(function () {
  'use strict';

  angular
    .module('templates.services')
    .factory('TemplatesService', TemplatesService);

  TemplatesService.$inject = ['$resource', '$q'];

  function TemplatesService($resource, $q) {

    function findTemplateByShortName(templateShortName) {
      console.log('findTemplateByShortName==='+templateShortName);
      return $q(function(resolve, reject) {
        getResource().query(function(templates) {
          angular.forEach(templates, function(template) {
            console.log('templ==='+template.shortName+' '+template.title+' '+templateShortName);
            if (template.shortName === templateShortName) {
              resolve(template);
              console.log('TROOUVE');

            }
          });
          reject();
        });
      });
    }

    function getResource() {
      return $resource('api/templates/:templateId',
        {
          templateId: '@_id'
        },
        {
          update: {
            method: 'PUT'
          }
        });
    }
    return {
      getResource: getResource,
      findTemplateByShortName: findTemplateByShortName
    };
  }
}());

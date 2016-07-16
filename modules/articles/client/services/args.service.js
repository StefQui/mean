(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('argsService', argsService);

  function argsService() {
    var shouldRender;
    var service = {
      findArgTypeById: findArgTypeById,
      getArgTypes: getArgTypes
    };

    function findArgTypeById(argTypeId) {
      console.log('args==='+getArgTypes());
      var res = null;
      angular.forEach(getArgTypes(), function(arg) {
        console.log('arg==='+arg.shortName+' '+argTypeId);
        if (arg.shortName === argTypeId) {
          res=arg;
        }
      });
      return res;
    }


    function getArgTypes() {
      return [{
        shortName: 'array',
        name: 'Array'
      },
      {
        shortName: 'resource',
        name: 'Resource'
      },
      {
        shortName: 'selectResourceMethod',
        name: 'Méthode sélect resource'
      },
      {
        shortName: 'removeResourceMethod',
        name: 'Méthode remove resource'
      },
      {
        shortName: 'saveResourceMethod',
        name: 'Méthode save resource'
      },
      {
        shortName: 'crud',
        name: 'Crud'
      }
    ];
    }


    return service;





  }
}());


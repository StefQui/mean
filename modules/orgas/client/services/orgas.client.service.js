(function () {
  'use strict';

  angular
    .module('orgas.services')
    .factory('OrgasService', OrgasService);

  OrgasService.$inject = ['$rootScope', '$resource', '$q', '$http'];

  function OrgasService($rootScope, $resource, $q, $http) {

    var currentOrga;

    function findOrgaByShortName(orgaShortName) {
      console.log('findTemplateByShortName==='+orgaShortName);
      return $q(function(resolve, reject) {
        getResource().query(function(orgas) {
          angular.forEach(orgas, function(orga) {
            console.log('orga==='+orga.shortName+' '+orga.title+' '+orgaShortName);
            if (orga.shortName === orgaShortName) {
              resolve(orga);
              console.log('TROOUVE');

            }
          });
          console.log('reject findByOrga');
          reject();
        });
      });
    }

    function getResource() {
      return $resource('api/orgas/:orgaId',
        {
          orgaId: '@_id'
        },
        {
          update: {
            method: 'PUT'
          }
        });
    }

    function checkAndInit(orgaShortName) {
      return $q(function(resolve, reject) {
        console.log('checkAndInit start');
        if (currentOrga) {
          if (currentOrga.shortName===orgaShortName) {
            resolve(currentOrga);
          } else {
            initOrga(null);
            reject();
          }
        } else {
          findOrgaByShortName(orgaShortName)
          .then(function(orga) {
            initOrga(orga);
            resolve(currentOrga);
          }, function() {
            initOrga(null);
            console.log('reject check');
            reject();
          });
        }
      });
    }

    function initOrga(orga) {
      currentOrga = orga;
      $rootScope.$emit('changedOrga', { orga: currentOrga });
      $http.post('/api/initOrga', { orga: currentOrga }).success(function (response) {
        // If successful we assign the response to the global user model


        // And redirect to the previous or home page

      }).error(function (response) {
        console.log('erreur pour passer l orga en session');
      });
      console.log('changedorga broadcasted'+currentOrga);
    }
    function getCurrentOrga() {
      return currentOrga;
    }

    return {
      getCurrentOrga: getCurrentOrga,
      getResource: getResource,
      findOrgaByShortName: findOrgaByShortName,
      checkAndInit: checkAndInit,
      initOrga: initOrga
    };




  }
}());

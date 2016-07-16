(function () {
  'use strict';

  angular
    .module('orgas')
    .controller('OrgaUrlController', OrgaUrlController);


  OrgaUrlController.$inject = ['$scope', '$stateParams', 'OrgasService'];

  function OrgaUrlController($scope, $stateParams, OrgasService) {
    $scope.hello='OrgaShortName:'+$stateParams.orgaShortName;
    OrgasService.checkAndInit($stateParams.orgaShortName).then(function(orga) {
      $scope.hello+=orga.title;
      $scope.currentOrga=orga;
    }, function() {
      console.log('reject orga url');
      $scope.currentOrga=null;
      $scope.hello='Pb... pas trouvé';
    });


  }
}());
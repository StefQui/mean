(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['OrgasService', '$scope'];

  function HomeController(OrgasService, $scope) {
    OrgasService.initOrga(null);
    $scope.orgas = OrgasService.getResource().query();
  }
}());

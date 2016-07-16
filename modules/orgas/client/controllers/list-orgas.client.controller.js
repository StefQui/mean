(function () {
  'use strict';

  angular
    .module('orgas')
    .controller('OrgasListController', OrgasListController);

  OrgasListController.$inject = ['OrgasService'];

  function OrgasListController(OrgasService) {
    var vm = this;

    vm.orgas = OrgasService.getResource().query();
  }
}());

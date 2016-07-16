(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$rootScope', '$state', 'Authentication', 'menuService', 'OrgasService'];

  function HeaderController($scope, $rootScope, $state, Authentication, menuService, OrgasService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);
    $rootScope.$on('changedOrga', function(orga) {
      console.log('changedorga detcted'+orga+' '+OrgasService.getCurrentOrga());
      menuService.refresh();
      // vm.menus = {};
      vm.accountMenu = menuService.getMenu('account').items[0];
      vm.authentication = Authentication;
      vm.isCollapsed = false;
      vm.menu = menuService.getMenu('topbar');


    });

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
  }
}());

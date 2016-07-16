(function () {
  'use strict';

  angular
    .module('orgas.services')
    .factory('orgaMenuService', orgaMenuService);

  orgaMenuService.$inject = ['OrgasService'];

  function orgaMenuService(OrgasService) {
    var shouldRender;
    var service = {
      fetchMenus: fetchMenus
    };

    function fetchMenus(menuService) {
      // menuService.init();
      console.log('higu'+OrgasService.getCurrentOrga());

      if (OrgasService.getCurrentOrga() === undefined || OrgasService.getCurrentOrga() === null) {
        menuService.addMenuItem('topbar', {
          title: 'Orgas',
          state: 'orgas',
          type: 'dropdown',
          roles: ['*']
        });

	    // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'orgas', {
          title: 'List Orgas',
          state: 'orgas.list'
        });

	    // Add the dropdown create item
        menuService.addSubMenuItem('topbar', 'orgas', {
          title: 'Create Orga',
          state: 'orgas.create',
          roles: ['user']
        });
      }

    }




    return service;





  }
}());



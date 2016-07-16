(function () {
  'use strict';

  angular
    .module('stef.services')
    .factory('stefMenuService', stefMenuService);

  stefMenuService.$inject = ['OrgasService'];

  function stefMenuService(OrgasService) {
    var shouldRender;
    var service = {
      fetchMenus: fetchMenus
    };

    function fetchMenus(menuService) {
      // menuService.init();
      console.log('higu'+OrgasService.getCurrentOrga());

      if (OrgasService.getCurrentOrga()) {
        menuService.addMenuItem('topbar', {
          title: 'Stef',
          state: 'stef.go({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })'
        });
      }

    }




    return service;





  }
}());
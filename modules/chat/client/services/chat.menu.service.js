(function () {
  'use strict';

  angular
    .module('chat.services')
    .factory('chatMenuService', chatMenuService);

  chatMenuService.$inject = ['OrgasService'];

  function chatMenuService(OrgasService) {
    var shouldRender;
    var service = {
      fetchMenus: fetchMenus
    };

    function fetchMenus(menuService) {
      // menuService.init();
      console.log('higu'+OrgasService.getCurrentOrga());

      if (OrgasService.getCurrentOrga()) {
        menuService.addMenuItem('topbar', {
          title: 'Chat',
          state: 'chat.go({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })'
        });
      }

    }




    return service;





  }
}());
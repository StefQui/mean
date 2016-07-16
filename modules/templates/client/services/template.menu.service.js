(function () {
  'use strict';

  angular
    .module('templates.services')
    .factory('templateMenuService', templateMenuService);

  templateMenuService.$inject = ['OrgasService'];

  function templateMenuService(OrgasService) {
    var shouldRender;
    var service = {
      fetchMenus: fetchMenus
    };

    function fetchMenus(menuService) {
      // menuService.init();
      console.log('higu'+OrgasService.getCurrentOrga());

      if (OrgasService.getCurrentOrga()) {
        menuService.addMenuItem('topbar', {
          title: 'Templates',
          state: 'templates',
          type: 'dropdown',
          roles: ['*']
        });

    // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'templates', {
          title: 'List templates',
          state: 'templates.list({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })'
        });

    // Add the dropdown create item
        menuService.addSubMenuItem('topbar', 'templates', {
          title: 'Create template',
          state: 'templates.create({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })',
          roles: ['user']
        });
      }

    }




    return service;





  }
}());
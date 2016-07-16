(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('articleMenuService', articleMenuService);

  articleMenuService.$inject = ['OrgasService'];

  function articleMenuService(OrgasService) {
    var shouldRender;
    var service = {
      fetchMenus: fetchMenus
    };

    function fetchMenus(menuService) {
      // menuService.init();
      console.log('higu'+OrgasService.getCurrentOrga());

      if (OrgasService.getCurrentOrga()) {
        menuService.addMenuItem('topbar', {
          title: 'Articles',
          state: 'articles',
          type: 'dropdown',
          roles: ['*']
        });

      // Add the dropdown list item
        menuService.addSubMenuItem('topbar', 'articles', {
          title: 'List Articles',
          state: 'articles.list({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })'
        });

      // Add the dropdown create item
        menuService.addSubMenuItem('topbar', 'articles', {
          title: 'Create Article',
          state: 'articles.create({ orgaShortName: \''+OrgasService.getCurrentOrga().shortName+'\' })',
          roles: ['user']
        });
      }

    }




    return service;





  }
}());


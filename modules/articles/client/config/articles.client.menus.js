(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['menuService', 'OrgasService'];

  function menuConfig(menuService, OrgasService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Articles',
    //   state: 'articles',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // if (OrgasService.currentOrga) {
    //   menuService.addSubMenuItem('topbar', 'articles', {
    //     title: 'List Articles',
    //     state: 'articles.list({ orgaShortName: '+OrgasService.currentOrga.shortName+' })'
    //   });
    // }

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'articles', {
    //   title: 'Create Article',
    //   state: 'articles.create',
    //   roles: ['user']
    // });
  }
}());

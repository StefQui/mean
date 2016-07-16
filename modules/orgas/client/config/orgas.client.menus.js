(function () {
  'use strict';

  angular
    .module('orgas')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
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
}());

(function () {
  'use strict';

  angular
    .module('templates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Templates',
    //   state: 'templates',
    //   type: 'dropdown',
    //   roles: ['*']
    // });

    // // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'templates', {
    //   title: 'List templates',
    //   state: 'templates.list'
    // });

    // // Add the dropdown create item
    // menuService.addSubMenuItem('topbar', 'templates', {
    //   title: 'Create template',
    //   state: 'templates.create',
    //   roles: ['user']
    // });
  }
}());

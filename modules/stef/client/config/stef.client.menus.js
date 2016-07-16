(function () {
  'use strict';

  angular
    .module('stef')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    // menuService.addMenuItem('topbar', {
    //   title: 'Stef',
    //   state: 'stef'
    // });
  }
}());

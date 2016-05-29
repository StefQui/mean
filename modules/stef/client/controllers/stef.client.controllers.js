(function () {
  'use strict';

  angular
    .module('stef')
    .controller('StefController', StefController);

  StefController.$inject = ['$scope', '$state', 'ArticlesService'];

  function StefController($scope, $state, ArticlesService) {
    var vm = this;

    vm.articles = ArticlesService.query();
  }
}());

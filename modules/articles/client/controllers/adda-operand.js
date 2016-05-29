(function () {
  'use strict';

  angular
  .module('articles')
  .directive('addaOperand', ['$uibModal', AddaOperand])
  .controller('myctrl', MyCtrl);

  AddaOperand.$inject = ['ui.bootstrap'];

  function AddaOperand($uibModal) {
    var directive = {
      scope: {},
      link: link
    };
    return directive;
    function link(scope, element) {
      element.text('totos');
    }
    // return {
    //   template: '<p>daddop</p>'
    // }
  }

  MyCtrl.$inject = ['$scope', '$uibModalInstance'];

  function MyCtrl($scope, $uibModalInstance) {
  }



}());



(function () {
  'use strict';

  angular
  .module('articles')
  .directive('addOperand', AddOp);

  AddOp.$inject = ['$rootScope'];

  function AddOp($rootScope) {
    var directive = {
      restrict: 'E',
      link: link
    };
    return directive;
    function link(scope, element) {
      element.html('<button type="submit" class="btn btn-default">Add new</button>');
    }
    // return {
    //   template: '<p>addop</p>'
    // }
  }

}());



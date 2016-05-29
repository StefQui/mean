'use strict';

angular
  .module('articles')
  .directive('opRenderer', [function OpRenderer() {
    var directive = {
      scope: {
        op: '='
      },
      controller: ['operandService', '$scope', function(operandService, $scope) {
        $scope.compiled = operandService.transform($scope.op, false);
      }],
      templateUrl: 'modules/articles/client/directives/op-renderer.html'
    };
    return directive;

  }]);

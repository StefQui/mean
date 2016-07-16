'use strict';

angular
  .module('articles')
  .directive('argsEditor', [function ArgEditor($uibModal) {
    var directive = {
      scope: {
        op: '='
      },
      controller: 'ArgsEditorController',
      // templateUrl: 'modules/articles/client/views/op-picker.client.view.html'
      templateUrl: 'modules/articles/client/directives/args-editor.html'
    };
    return directive;

  }])
  .controller('ArgsEditorController', ['operandService', 'argsService', '$scope', function(operandService, argsService, $scope) {

    $scope.createWithArgType = function(argType) {
      var ind = $scope.op.args.length;
      $scope.op.args.push({
        argTypeId: argType.shortName
      });
      $scope.editArg(ind);
    }
    $scope.editArg = function(index) {
      $scope.op.args[index].editMode = !$scope.op.args[index].editMode;
      $scope.op.args[index].argType = argsService.findArgTypeById($scope.op.args[index].argTypeId);
    }
    $scope.removeArg = function(arg) {

    }


  }]);

'use strict';

angular
  .module('articles')
  .directive('argForm', [function ArgForm($uibModal) {
    var directive = {
      scope: {
        arg: '='
      },
      controller: 'ArgFormController',
      // templateUrl: 'modules/articles/client/views/op-picker.client.view.html'
      templateUrl: 'modules/articles/client/directives/args/arg-form.html'
    };
    return directive;

  }])
  .controller('ArgFormController', ['operandService', '$scope', function(operandService, $scope) {
    $scope.selectArgTy = function(argType) {
      console.log('datahere'+argType);
      $scope.arg.argType = argType;
      $scope.arg.argTypeId = argType.shortName;
    }


  }]);

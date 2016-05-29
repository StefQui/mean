'use strict';

angular
  .module('articles')
  .controller('OldModalCtrl', ['$scope', '$uibModalInstance', 'items', 'operand',
  	function ($scope, $uibModalInstance, items, operand) {
    $scope.operand = operand;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };

    $scope.ok = function () {
      console.log('saving...'+$scope.operand);
      $uibModalInstance.close({
        // selectedItem: $scope.selected.item,
        operand: $scope.operand
      });
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.updateOp = function(operand) {
      console.log('updateOp...'+operand);
    }

  }]);

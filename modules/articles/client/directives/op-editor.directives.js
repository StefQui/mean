'use strict';

angular
  .module('articles')
  .directive('opEditor', [function OpEditor($uibModal) {
    var directive = {
      scope: {
        op: '=',
        ind: '=',
        showremove: '=',
        updateOperand: '&'
      },
      controller: 'OpEditorController',
      // templateUrl: 'modules/articles/client/views/op-picker.client.view.html'
      templateUrl: 'modules/articles/client/directives/op-editor.view.html'
    };
    return directive;

  }])
  .controller('OpEditorController', ['operandService', '$scope', '$uibModal', function(operandService, $scope, $uibModal) {
    $scope.edit = function (newOne) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        // templateUrl: 'myModalContent.html',
        templateUrl: 'modules/articles/client/directives/op-editor.modal.html',
        controller: 'OpEditorModalCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          },
          operand: function () {
            // newOne.compiled = operandService.transform(newOne, false);
            // console.log('creatone:' + newOne.compiled);
            return newOne;
          },
          index: function () {
            return $scope.ind;
          }
        }
      });

      modalInstance.result.then(function (data) {
        console.log('save1 op: ' + data.operand.name+' index='+data.index);
        $scope.selected = data.selectedItem;
        $scope.op = data.operand;
        $scope.updateOperand(data);
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
    // $scope.updateLine = function (op) {
    //   // $scope.operand.operands.splice(ind, 1);
    //   console.log('updatelinezzzz...'+op);
    //   $scope.operand.operands.splice(999, 1, op);
    // }

    $scope.removeOp = function () {
      $scope.op = null;
    }
    $scope.updateOp = function (operand) {
      console.log('upadetop3333'+operand);
      this.updateOperand({ operand: operand });
    }
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  }])
  .controller('OpEditorModalCtrl', ['$scope', '$uibModalInstance', 'items', 'index', 'operand',
  	function ($scope, $uibModalInstance, items, index, operand) {
    $scope.operand = operand;
    $scope.index = index;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
    $scope.master = angular.copy($scope.operand);

    $scope.reset = function() {
      $scope.operand = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.ok = function () {
      console.log('saving...'+$scope.operand);
      $uibModalInstance.close({
        // selectedItem: $scope.selected.item,
        operand: $scope.operand,
        index: $scope.index
      });
    };
    $scope.createOp = function (operandToAdd) {
      console.log('creatingop...'+operandToAdd);
      if ($scope.operand.operands==null) {
        $scope.operand.operands = [];
      }
      $scope.operand.operands.push(operandToAdd);
    };
    $scope.removeOpFromList = function (ind) {
      $scope.operand.operands.splice(ind, 1);
    }
    $scope.updateLine = function (index, op) {
      // $scope.operand.operands.splice(ind, 1);
      console.log('updateline...'+index+' '+op);
      $scope.operand.operands.splice(index, 1, op);
    }

    $scope.cancel = function () {
      $scope.reset();
      $uibModalInstance.dismiss('cancel');
    };

    $scope.updateOp = function(operand) {
      console.log('updateOp...'+operand);
    }

  }]);

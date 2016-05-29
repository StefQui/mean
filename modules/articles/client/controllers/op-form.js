(function () {
  'use strict';

  angular
    .module('articles')
    .directive('opForm', ['$uibModal', MyDir]);
    // .controller('ModalCtrl', ModalCtrl);


  MyDir.$inject = ['ui.bootstrap'];


  function MyDir($uibModal) {
    return {
//        controller: function($scope, $uibModal) {

      scope: {
        ngModel: '='
      },
      controller: function($scope) {
        $scope.AA = 'hello';
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        // $scope.open = function (size) {

        //   var modalInstance = $uibModal.open({
        //     animation: $scope.animationsEnabled,
        //     templateUrl: 'myModalContent.html',
        //     controller: 'ModalCtrl',
        //     size: size,
        //     resolve: {
        //       items: function () {
        //         return $scope.items;
        //       }
        //     }
        //   });

        //   modalInstance.result.then(function (selectedItem) {
        //     $scope.selected = selectedItem;
        //   }, function () {
        //     console.log('Modal dismissed at: ' + new Date());
        //   });
        // };
        $scope.edit = function (newOne) {

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalCtrl',
            size: 'sm',
            resolve: {
              items: function () {
                return $scope.items;
              },
              operand: function () {
                console.log('creatone:' + newOne.name);
                return newOne;
              }
            }
          });

          modalInstance.result.then(function (data) {
            console.log('save op: ' + data.operand);
            $scope.selected = data.selectedItem;
            $scope.ngModel = data.operand;
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
        };

        $scope.removeOp = function () {
          $scope.ngModel = null;
        }

        $scope.toggleAnimation = function () {
          $scope.animationsEnabled = !$scope.animationsEnabled;
        };

      },
      templateUrl: 'modules/articles/client/views/op-picker.client.view.html'
    };
  }


  // ModalCtrl.$inject = ['$scope', '$uibModalInstance', 'items', 'operand'];

  // function ModalCtrl($scope, $uibModalInstance, items, operand) {
  //   // $scope.items = items;
  //   $scope.operand = operand;
  //   // $scope.selected = {
  //   //   item: $scope.items[0]
  //   // };

  //   $scope.ok = function () {
  //     console.log('saving...'+$scope.operand);
  //     $uibModalInstance.close({
  //       // selectedItem: $scope.selected.item,
  //       operand: $scope.operand
  //     });
  //   };

  //   $scope.cancel = function () {
  //     $uibModalInstance.dismiss('cancel');
  //   };
  // }

}());

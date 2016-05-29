(function () {
  'use strict';

  angular
    .module('articles')
    .directive('oldopForm', ['$uibModal', MyDir])
    .controller('oldModalCtrl', ModalCtrl);


  MyDir.$inject = ['ui.bootstrap'];


  function MyDir($uibModal) {
    return {
//        controller: function($scope, $uibModal) {
      controller: function($scope) {
        $scope.AA = 'hello';
        $scope.items = ['item1', 'item2', 'item3'];

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

          var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalCtrl',
            size: size,
            resolve: {
              items: function () {
                return $scope.items;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
          }, function () {
            console.log('Modal dismissed at: ' + new Date());
          });
        };

        $scope.toggleAnimation = function () {
          $scope.animationsEnabled = !$scope.animationsEnabled;
        };

      },
      templateUrl: 'modules/articles/client/views/oldop-picker.client.view.html'
    };
  }


  ModalCtrl.$inject = ['$scope', '$uibModalInstance', 'items'];

  function ModalCtrl($scope, $uibModalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

}());

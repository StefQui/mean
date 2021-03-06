  'use strict';

  angular
  .module('articles')
  .directive('chooseType', ['$rootScope', '$uibModal', function AddOp($rootScope, $uibModal) {
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        update: '&'
      },
      templateUrl: 'modules/articles/client/directives/choose-type.html',
      controller: 'ChooseTypeCtrl'
      // resolve: {
      //   create: function() {
      //     return $scope.create;
      //   }
      // }
    };
    return directive;

    function link(scope, element) {
    }
    // return {
    //   template: '<p>addop</p>'
    // }
  }])
  .controller('ChooseTypeCtrl', ['$scope', '$uibModal', function($scope, $uibModal) {
    // $scope.create = create;
    $scope.types = [{
      shortName: 'constText',
      name: 'Constante texte'
    },
    {
      shortName: 'markup',
      name: 'Markup'
    },
    {
      shortName: 'create',
      name: 'Create'
    },
    {
      shortName: 'list',
      name: 'Liste'
    },
    {
      shortName: 'form',
      name: 'Formulaire'
    },
    {
      shortName: 'variable',
      name: 'Lien vers une variable'
    }
      ];

    $scope.selectType = function(type) {
      console.log('selecttype...' + type.shortName);
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/articles/client/directives/op-editor.modal.html',
        controller: 'OpEditorModalCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          },
          operand: function () {
            return {
              type: type.shortName,
              emitters: [],
              args: [],
              name: ''
            };
            // console.log('creatone:' + newOne.name);
            // return newOne;
          },
          index: function () {
            return null;
          }
        }
      });

      modalInstance.result.then(function (data) {
        console.log('save op: ' + data.operand);
        // $scope.selected = data.selectedItem;
        // $scope.ngModel = data.operand;
        $scope.update({ operand: data.operand });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });

      // $scope.create(type);
    }
  }]);

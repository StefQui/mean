  'use strict';

  angular
  .module('templates')
  .directive('createResource', ['$rootScope', '$uibModal', function AddOp($rootScope, $uibModal) {
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        oncreated: '&'
      },
      templateUrl: 'modules/resources/client/directives/create-resource.html',
      controller: 'CreateResourceCtrl'
      // resolve: {
      //   create: function() {
      //     return $scope.create;
      //   }
      // }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.currentPath = attrs.path;
    }
    // return {
    //   template: '<p>addop</p>'
    // }
  }])
  .controller('CreateResourceCtrl', ['$scope', '$uibModal', 'TemplatesService', 'ResourcesService', function($scope, $uibModal, TemplatesService, ResourcesService) {
    // $scope.create = create;
    $scope.templates = TemplatesService.getResource().query();
    // $scope.templates = [{
    //   shortName: 'constText',
    //   name: 'Constante texte'
    // },
    // {
    //   shortName: 'markup',
    //   name: 'Markup'
    // },
    // {
    //   shortName: 'variable',
    //   name: 'Lien vers une variable'
    // }
    //   ];
    $scope.test = function() {
      $scope.oncreated();
      console.log('test1ok');
    }

    $scope.selectTemplate = function(template) {
      console.log('selecttemplate...' + template.title);
//      $scope.choose({ template: template });
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'modules/resources/client/views/resource-editor.modal.html',
        controller: 'ResourceEditorModalCtrl',
        size: 'lg',
        resolve: {
          resource: function () {
            var res = new ResourcesService();
            res.template = template;
            return res;
            // console.log('creatone:' + newOne.name);
            // return newOne;
          }
        }
      });

      modalInstance.result.then(function (data) {
        console.log('save resource: ' + data.operand);
        // $scope.selected = data.selectedItem;
        // $scope.ngModel = data.operand;
        if (data.resource._id) {
          data.resource.$update(successCallback, errorCallback);
        } else {
          data.resource.$save(successCallback, errorCallback);
        }

        function successCallback(res) {
          // $state.go('articles.view', {
          //   articleId: res._id
          // });
          // console.log('successbc'+$scope.rcreated);
          $scope.$parent.oncreated(
            {
              eventType: 'resourceCreation',
              resource: res,
              emitter: $scope.currentPath
            }
          );
          // $scope.oncreated({ resource: res });
        }

        function errorCallback(res) {
          data.resource.error = res.data.message;
        }



        // $scope.updateResource({ resource: data.resource });
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

  }])
  .controller('ResourceEditorModalCtrl', ['$scope', '$uibModalInstance', 'resource',
  	function ($scope, $uibModalInstance, resource) {
    $scope.resource = resource;
    // $scope.index = index;
    // $scope.selected = {
    //   item: $scope.items[0]
    // };
    $scope.master = angular.copy($scope.resource);

    $scope.reset = function() {
      $scope.resource = angular.copy($scope.master);
    };
    $scope.reset();
    $scope.ok = function (isValid) {
      console.log('isValid=='+isValid);
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.resourceForm');
        return false;
      }

      // TODO: move create/update logic to service




      console.log('saving...'+$scope.resource);
      $uibModalInstance.close({
        // selectedItem: $scope.selected.item,
        resource: $scope.resource
      });
    };
    // $scope.createRes = function (operandToAdd) {
    //   console.log('creatingop...'+operandToAdd);
    //   if ($scope.operand.operands==null) {
    //     $scope.operand.operands = [];
    //   }
    //   $scope.operand.operands.push(operandToAdd);
    // };
    // $scope.removeOpFromList = function (ind) {
    //   $scope.operand.operands.splice(ind, 1);
    // }
    // $scope.updateLine = function (index, op) {
    //   // $scope.operand.operands.splice(ind, 1);
    //   console.log('updateline...'+index+' '+op);
    //   $scope.operand.operands.splice(index, 1, op);
    // }

    $scope.cancel = function () {
      $scope.reset();
      $uibModalInstance.dismiss('cancel');
    };

    // $scope.updateOp = function(operand) {
    //   console.log('updateOp...'+operand);
    // }

  }]);


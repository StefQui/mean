'use strict';

angular
  .module('articles')
  .directive('opFormulaire', ['$compile', 'operandService', function OpForm($compile, operandService) {
    var directive = {
      // templateUrl: 'modules/articles/client/directives/form/op-form.html',
      // template: 'Hellooooo{{AA}}dopo<div ng-transclude></div>',
      // template: function() {

      //   return 'Hello{{AA}}<div ng-transclude></div>';
      // },
      scope: {

      },
      restrict: 'E',
      // transclude: true,
      link: function (scope, element, attrs) {
        // console.log('attrsbuild='+attrs.build + ' '+ element.html());
          // element.html('<b><u>BUILD</u></b>');
          // element.html('<div style="background:yellow">'+element.html()+'</div>');
        operandService.addPath(element, attrs);
        operandService.addListeners(element, attrs);
        scope.currentEmitters = attrs.emitters;
        scope.currentPath = attrs.path;
//       element.prepend('<span>'+attrs.path+'</span>');
//       element.prepend('<span>'+attrs.path+'</span>');
          // var jQueryElement = angular.element(element);
          // element.wrap(function() {
          //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
          // });
          // element
          // '<div style="background:yellow">Start</div>');
        // console.log('attrs.compilr=='+element.html());
        element.replaceWith($compile(element.html())(scope));
        // element.html('<div html-compiler="'+attrs.html+'"></div>');
        // element.html('<div html-compiler="{{\'<h2>DD</h2>\'}}">fffff</div>');
      },
      controller: 'FormCtrl'
    };
    return directive;

  }])
  .controller('FormCtrl', ['$scope', 'ResourcesService', function($scope, ResourcesService) {
    // $scope.createResource = function(template) {
    //   console.log('choosing template:'+template.title);

    // console.log('initFormCtrl'+$scope.AA);
    // }
    // $scope.smevent.
    $scope.$parent.$watch('smevent', function() {
      console.log('chope smevent...'+$scope.currentEmitters);
      if ($scope.$parent.smevent) {
        // console.log('chope smevent2 '+JSON.stringify($scope.$parent.smevent));
        // console.log('chope smevent3'+$scope.smevent.smevent.emitter);
        var emitters = $scope.currentEmitters.split(',');
        angular.forEach(emitters, function(emitter) {
          if (emitter === $scope.$parent.smevent.emitter) {
            $scope.refresh();
          }
        });
        // if ($scope.currentEmitters.indexOf($scope.$parent.smevent.emitter) > -1) {
        //   $scope.refresh();
        // }
      }
    });
    $scope.exists = function() {
      return ($scope.resource !== undefined) && ($scope.resource !== null);
    }
    $scope.refresh = function() {
      console.log('chope smevent44 '+$scope.$parent.smevent);
      if ($scope.$parent.smevent) {
        // console.log('chope smevent44 '+$scope.$parent.smevent.resource.title);
        // $scope.resource = $scope.$parent.smevent.resource;
        if ($scope.$parent.smevent.resource) {
          $scope.resource = angular.copy($scope.$parent.smevent.resource);
          $scope.master = angular.copy($scope.resource);
        } else {
          $scope.resource = null;
          $scope.master = null;
        }
        // $scope.AA='REFRESH!';

      }
    }
    $scope.reset = function() {
      $scope.resource = angular.copy($scope.master);
    };
    $scope.save = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if ($scope.resource._id) {
        $scope.resource.$update(successCallback, errorCallback);
      } else {
        $scope.resource.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $scope.$parent.sendEvent({
          eventType: 'resourceUpdated',
          resource: res,
          emitter: $scope.currentPath
        })
        $scope.resource = $scope.$parent.smevent.resource;
        $scope.master = angular.copy($scope.resource);
        $scope.error = null;
      }

      function errorCallback(res) {
        $scope.error = res.data.message;
      }
    };
    // $scope.AA='STEF';
    $scope.refresh();
  }]);


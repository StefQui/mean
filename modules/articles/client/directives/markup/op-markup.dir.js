'use strict';

angular
  .module('articles')
  .directive('opMarkup', ['operandService', function OpMarkup(operandService) {
    var directive = {
      // transclude: true,
      // templateUrl: 'modules/articles/client/directives/markup/op-markup.html',
      template: '<div ng-transclude></div>',
      transclude: true,
      link: function (scope, element, attrs) {
        // console.log('attrsbuild='+attrs.build + ' '+ element.html());
        operandService.addPath(element, attrs);
        if (attrs.build === undefined) {
          // element.html('<b><u>BUILD</u></b>');
          // element.html('<div style="background:yellow">'+element.html()+'</div>');
          element.wrap('<div style="border:1px solid blue"></div>');
          // var jQueryElement = angular.element(element);
          // element.wrap(function() {
          //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
          // });
          // element
          // '<div style="background:yellow">Start</div>');
        }
      },
      controller: 'OpMarkupCtrl'
    };
    return directive;

  }])
  .directive('arg', function() {
    return {
      require: '^^opMarkup',
      restrict: 'E',
      transclude: true,
      // terminal: true,

      scope: {
        // title: '@'
      },
      link: function(scope, element, attrs, opMarkupCtrlsCtrl) {
        console.log('hello acceptArg');
        opMarkupCtrlsCtrl.acceptArg(attrs);
        // tabsCtrl.addPane(scope);
      }
    };
  })
  .controller('OpMarkupCtrl', ['$scope', '$element', 'ResourcesService', 'argsService', 'TemplatesService', function($scope, $element, ResourcesService, argsService, TemplatesService) {
    this.acceptArg = function(attrs) {
      if (attrs.argtypeid === 'zzzarray') {
        $scope[attrs.alias+'.refresh'] = function() {
          console.log('fetch resources en cours'+attrs.argtypeid+' '+attrs.alias);
          $scope[attrs.alias] = ResourcesService.query();
          // $scope[attrs.alias] = [{ title: 'coco' }];
        }
        $scope[attrs.alias+'.refresh']();
      } else if (attrs.argtypeid === 'zzzselectResourceMethod') {
        $scope[attrs.alias] = function(resource) {
          console.log('22fetch resources en cours'+attrs.argtypeid+' '+attrs.alias);
          $scope[attrs.selectedalias] = resource;
          // $scope.$parent.sendEvent({
          //   eventType: 'resourceSelect',
          //   resource: resource,
          //   emitter: $scope.currentPath
          // })
          $scope.sendEvent({
            eventType: 'resourceSelect2',
            selectedAlias: attrs.selectedalias,
            resource: resource,
            emitter: $scope.currentPath
          })
        }
      } else if (attrs.argtypeid === 'zzzremoveResourceMethod') {
        $scope[attrs.alias] = function(resource) {
          resource.$remove(function() {
            console.log('remove done');
            $scope[attrs.arrayAlias+'.refresh']();
            $scope.sendEvent(
              {
                eventType: 'resourceRemoved',
                resource: null,
                emitter: $scope.currentPath
              });
          });
          $scope.sendEvent({
            eventType: 'resourceSelect2',
            selectedAlias: attrs.selectedalias,
            resource: resource,
            emitter: $scope.currentPath
          })
        }
      } else if (attrs.argtypeid === 'crud') {
        var crud = attrs.alias;
        var Crud = attrs.alias.charAt(0).toUpperCase() + attrs.alias.slice(1);
        var refresh = 'refresh'+Crud + 's';
        var remove = 'remove'+Crud;
        var select = 'select'+Crud;
        var save = 'save'+Crud;
        var createForTemplate = 'create'+Crud+'ForTemplate';
        var selected = 'selected'+Crud;
        var original = 'original'+Crud;
        var reset = 'reset'+Crud;
        $scope[refresh] = function() {
          // console.log('fetch resources en cours'+attrs.argtypeid+' '+attrs.alias);
          $scope[crud+'s'] = ResourcesService.filtered({
            // title: '*'
          });
          // $scope[attrs.alias] = [{ title: 'coco' }];
        }
        $scope[refresh]();
        $scope[remove] = function(resource) {
          resource.$remove(function() {
            console.log('remove done');
            $scope[original] = null;
            $scope[selected] = null;
            $scope[refresh]();
            $scope.sendEvent(
              {
                eventType: 'resourceRemoved',
                resource: null,
                emitter: $scope.currentPath
              });
          });
        }
        $scope[select] = function(resource) {
          $scope[original] = resource;
          $scope[selected] = angular.copy(resource);
          $scope.sendEvent({
            eventType: 'resourceSelect2',
            selectedAlias: attrs.selectedalias,
            resource: resource,
            emitter: $scope.currentPath
          })
        }
        $scope[createForTemplate] = function(templateShortName) {
          var res = new ResourcesService();
          res.template = TemplatesService.findTemplateByShortName(templateShortName)
          .then(function(template) {
            res.template = template;
            console.log('create temp'+JSON.stringify(res.template));
            $scope[original] = res;
            $scope[selected] = angular.copy(res);
            $scope.sendEvent({
              eventType: 'resourceSelect2',
              selectedAlias: attrs.selectedalias,
              resource: res,
              emitter: $scope.currentPath
            })
          });
        }
        $scope[reset] = function(resource) {
          $scope[selected] = angular.copy($scope[original]);
        }
        $scope[save] = function(isValid, andReinitialise) {
          var andReinitialise = ((andReinitialise !== undefined) ? andReinitialise : true);
          console.log('reinit='+andReinitialise);
          if (!isValid) {
            $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
            return false;
          }

      // TODO: move create/update logic to service
          if ($scope[selected]._id) {
            $scope[selected].$update(successCallback, errorCallback);
          } else {
            $scope[selected].$save(successCallback, errorCallback);
          }

          function successCallback(res) {
            $scope.sendEvent({
              eventType: 'resourceUpdated',
              resource: res,
              emitter: $scope.currentPath
            })
            if (andReinitialise) {
              $scope[original] = null;
              $scope[selected] = null;
            } else {
              $scope[original] = res;
              $scope[selected] = angular.copy(res);
            }
            $scope[refresh]();
            // $scope[selected] = res;
            // $scope.master = angular.copy(res);
            $scope.error = null;
          }

          function errorCallback(res) {
            $scope.error = res.data.message;
          }
        };
      }
    }
  }]);

  // .controller('opMarkupCtrl', ['$scope', function($scope) {
  //   var args = $scope.args = [];
  //   this.addArg = function(key, argScope) {
  //     args.push({ key: key, argScope: argScope });
  //     $scope[key] = 'toto' + argScope.content;
  //   }
  // }]);
 // .controller('opMarkupCtrl', ['$scope', function($scope) {
  //   var args = $scope.args = [];
  //   this.addArg = function(key, argScope) {
  //     args.push({ key: key, argScope: argScope });
  //     $scope[key] = 'toto' + argScope.content;
  //   }
  // }]);

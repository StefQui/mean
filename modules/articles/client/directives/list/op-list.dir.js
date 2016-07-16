'use strict';

angular
  .module('articles')
  .directive('opList', ['operandService', '$timeout', '$compile', function OpList(operandService, $timeout, $compile) {
    var directive = {
      // templateUrl: 'modules/articles/client/directives/list/op-list.html',
      scope: {

      },
      terminal: true,
      link: function (scope, element, attrs) {
        // console.log('attrsbuild='+attrs.build + ' '+ element.html());
          // element.html('<b><u>BUILD</u></b>');
          // element.html('<div style="background:yellow">'+element.html()+'</div>');
         // scope.resources = [{ title: 'zz' }, { title: 'cocoo' }];
//       element.prepend('<span>'+attrs.path+'</span>');
//       element.prepend('<span>'+attrs.path+'</span>');
          // var jQueryElement = angular.element(element);
          // element.wrap(function() {
          //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
          // });
          // element
          // '<div style="background:yellow">Start</div>');
        // scope.$watch(
        //   function(scope) {
        //      // watch the 'compile' expression for changes
        //     return scope.$eval(element.html());
        //   },
        //   function(value) {
        //     // when the 'compile' expression changes
        //     // assign it into the current DOM
        //     element.html(value);

        //     // compile the new DOM and link it to the current
        //     // scope.
        //     // NOTE: we only compile .childNodes so that
        //     // we don't get into infinite loop compiling ourselves
        //     $compile(element.contents())(scope);
        //     $timeout(function () {
        //       scope.$digest();
        //     });
        //   }
        // );

        // var data = ['1111', '2222'];
        // var html =
        //     '<div>LISTE' +
        //     '<ul>' +
        //     '<li ng-repeat="score in data">{{score}}</li>' +
        //     '</ul>'+
        //     '</div>';

        // var el = angular.element(html);

        // scope.resources = [{ title: 'YESYES' }];
        operandService.addPath(element, attrs);
        operandService.addListeners(element, attrs);
        scope.currentEmitters = attrs.emitters;
        scope.currentPath = attrs.path;

        // scope.data = data;
        // var result = $compile(el)(scope);
        // console.log('EL1='+el.html());
        // element.append(el);

       // var el = angular.element(element.html());
       //  var aa = $compile(el)(scope);
        console.log('beforeurnObject'+JSON.stringify(attrs)+' ---- '+element.html());
        scope.AA = 'in link'; // attention, important!
        // var html = '<div>{{resources || json}}<br/><br/><'+attrs.tag+' ng-repeat="resource in resources">'+element.html()+'</'+attrs.tag+'></div>';
        // console.log('2beforeurnObject'+html);
        // element.prepend('<h2>before</h2>');
        // element.prepend(html);
        var aa = $compile(element.html())(scope);
        element.replaceWith(aa);
        scope.$watch('resources', function(html) {
          // ele.html(html);
          // scope.$digest();
        });
        // var el = angular.copy(element);
        // var returnObject = $compile(element.html())(scope);
        // $compile(element.contents())(scope)
        // var returnObject1 = $compile(html)(scope);
        // element.replaceWith($compile(element.html())(scope));
        // scope.$watch(attrs.dynamic, function(html) {
        //   element.html(html);
        //   $compile(element.contents())(scope);
        // });
        // var el = element;
        // var aa = $compile(element.contents())(scope);
        $timeout(function() {
          console.log('EL2='+element.html());
          // scope.$apply();
          // console.log('returnObject'+returnObject.html());
          // element.replaceWith(aa);
         // console.log(el.html());
          // element.replaceWith(el);
          // alert(element.html());
        });
      },
      controller: 'ListCtrl'
    };
    return directive;

  }])
  .controller('ListCtrl', ['$scope', '$element', 'ResourcesService', function($scope, $element, ResourcesService) {
    // $scope.createResource = function(template) {
    //   console.log('choosing template:'+template.title);

    // }
    // $scope.smevent.
    // $element.html('<div>JUJU</div>');
    $scope.AA = 'mmm'; // attention, important!
    $scope.resources = [{ title: 'heloo' }]; // attention, important!
    $scope.$parent.$watch('smevent', function() {
      console.log('watch triggerer for list'+$scope.currentPath+' '+$scope.currentEmitters);
      if ($scope.$parent.smevent) {
        var emitters = $scope.currentEmitters.split(',');
        angular.forEach(emitters, function(emitter) {
          if (emitter === $scope.$parent.smevent.emitter) {
            $scope.refresh();
          }
        });
      }
    });
    $scope.refresh = function() {
      console.log('fetch resources en cours');
      $scope.resources = ResourcesService.query();
    }
    $scope.refresh();
    $scope.removeResource = function(resource) {
      resource.$remove(function() {
        console.log('remove done');
        $scope.refresh();
        $scope.$parent.sendEvent(
          {
            eventType: 'resourceRemoved',
            resource: null,
            emitter: $scope.currentPath
          });
      });
    }
    $scope.selectResource = function(resource) {
      $scope.$parent.sendEvent({
        eventType: 'resourceSelect',
        resource: resource,
        emitter: $scope.currentPath
      })
    }
  }]);

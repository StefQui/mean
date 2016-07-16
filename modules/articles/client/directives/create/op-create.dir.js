'use strict';

angular
  .module('articles')
  .directive('opCreate', ['operandService', function OpCreate(operandService) {
    var directive = {
      // transclude: true,
      scope: {

      },
      templateUrl: 'modules/articles/client/directives/create/op-create.html',
      // link: function (scope, element, attrs) {
      //   console.log('attrsbuild='+attrs.build + ' '+ element.html());
      //   element.html('<button class="btn btn-default">Créer</button>');
      //   if (attrs.build === undefined) {
      //     element.html('<button class="btn btn-default">Créer</button>');
      //     // element.html('<div style="background:yellow">'+element.html()+'</div>');
      //     element.wrap('<div style="border:1px solid green"></div>');
      //     // var jQueryElement = angular.element(element);
      //     // element.wrap(function() {
      //     //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
      //     // });
      //     // element
      //     // '<div style="background:yellow">Start</div>');
      //   }
      // },
      link: function (scope, element, attrs) {
        operandService.addPath(element, attrs);
        // console.log('attrsbuild='+attrs.build + ' '+ element.html());
          // element.html('<b><u>BUILD</u></b>');
          // element.html('<div style="background:yellow">'+element.html()+'</div>');
        element.prepend('<span>'+attrs.path+'</span>');
        scope.currentPath = attrs.path;
        scope.oncreated = function(smevent) {
          scope.$parent.sendEvent(smevent);
        };
                  // var jQueryElement = angular.element(element);
          // element.wrap(function() {
          //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
          // });
          // element
          // '<div style="background:yellow">Start</div>');
      }
      // controller: 'CreateResourceCtrl'
    };
    return directive;

  }])
  .controller('CreateResourceCtrl', ['$scope', function($scope) {
    // var args = $scope.args = [];
  }]);

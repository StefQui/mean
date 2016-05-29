'use strict';

angular
  .module('articles')
  .directive('opMarkup', [function OpMarkup() {
    var directive = {
      // transclude: true,
      // templateUrl: 'modules/articles/client/directives/markup/op-markup.html',
      link: function (scope, element, attrs) {
        console.log('attrsbuild='+attrs.build + ' '+ element.html());
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
      }
      // controller: 'opMarkupCtrl'
    };
    return directive;

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

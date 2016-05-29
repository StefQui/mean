'use strict';

angular
  .module('articles')
  .directive('opConsttext', [function OpConstText() {
    var directive = {
      // scope: {
      //   op: '='
      // },
      // transclude: true,
      link: function (scope, element, attrs) {
        console.log('attrsbuild='+attrs.build + ' '+ element.html());
        if (attrs.build === undefined) {
          // element.html('<b><u>BUILD</u></b>');
          // element.html('<div style="background:yellow">'+element.html()+'</div>');
          element.wrap('<div style="background:orange"></div>');
          // var jQueryElement = angular.element(element);
          // element.wrap(function() {
          //   return '<div style="background:yellow">Start' + $(this).contents() + 'After></div>';
          // });
          // element
          // '<div style="background:yellow">Start</div>');
        }
      }
      // controller: ['$scope', function($scope) {
      //   this.initContent = function(contentScope) {
      //     $scope.contentScope = contentScope;
      //   };
      // }],
      // templateUrl: 'modules/articles/client/directives/consttext/op-consttext.html'
    };
    return directive;

  }]);

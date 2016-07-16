'use strict';

angular
  .module('articles')
  .directive('elementCompiler', ['$compile', function HtmlCompiler($compile) {
    return function(scope, element, attrs) {
      scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.elementCompiler);
          },
          function(value) {
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.append(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
            $compile(element.contents())(scope);
          }
        );
    };

  }]);

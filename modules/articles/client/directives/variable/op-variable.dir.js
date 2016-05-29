'use strict';

angular
  .module('articles')
  .directive('zzzopVariable', ['ArticlesService', function OpVariable(ArticlesService) {
    var directive = {
      // transclude: true,
      // templateUrl: 'modules/articles/client/directives/markup/op-markup.html',
      link: function (scope, element, attrs) {
        console.log('attrsbuild='+attrs.build + ' '+ element.html());
        // var articles = ArticlesService.query();
        var prom = ArticlesService.get({ articleId: attrs.varid }).$promise;
        prom.then(function(article) {
          element.html('<div html-compiler=\"'+article.compiled+'\"<b>YES</b>"></div>');
          element.html('<div html-compiler="<b>YES</b>"></div>');
          element.html(article.compiled);
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
        }, function(reason) {
          element.html('error...');
        });
      }
      // controller: 'opMarkupCtrl'
    };
    return directive;

  }]);

angular
  .module('articles')
  .directive('opVariable', ['ArticlesService', '$compile', function HtmlCompiler(ArticlesService, $compile) {
    return function(scope, element, attrs) {
      scope.$watch(
          function(scope) {
             // watch the 'compile' expression for changes
            return scope.$eval(attrs.htmlCompiler);
          },
          function(value) {
            var prom = ArticlesService.get({ articleId: attrs.varid }).$promise;
            prom.then(function(article) {
              element.html(article.compiled);
              $compile(element.contents())(scope);
            }, function(reason) {
              element.html('error...');
            });
           // element.html(value);

            // compile the new DOM and link it to the current
            // scope.
            // NOTE: we only compile .childNodes so that
            // we don't get into infinite loop compiling ourselves
          }
        );
    };

  }]);



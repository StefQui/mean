'use strict';




angular
  .module('articles')
  .directive('opViewer', [function OpRenderer() {

    var directive = {
      scope: {
        op: '='
      },
      templateUrl: 'modules/articles/client/directives/op-viewer.html'
    };
    return directive;

  }]);

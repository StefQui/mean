'use strict';

angular
  .module('articles')
  .directive('chooseArg', ['$rootScope', function AddOp($rootScope) {
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        select: '&',
        val: '='
      },
      templateUrl: 'modules/articles/client/directives/choose-arg.html',
      controller: 'ChooseArgCtrl'
      // resolve: {
      //   create: function() {
      //     return $scope.create;
      //   }
      // }
    };
    return directive;

    function link(scope, element) {
    }
    // return {
    //   template: '<p>addop</p>'
    // }
  }])
  .controller('ChooseArgCtrl', ['$scope', 'argsService', function($scope, argsService) {
    // $scope.create = create;

    $scope.argTypes = argsService.getArgTypes();

    $scope.selectArgType = function(argType) {
      console.log('selectargtype...' + argType.shortName);
      $scope.select({ argType: argType });
    }
      // $scope.create(type);
  }]);

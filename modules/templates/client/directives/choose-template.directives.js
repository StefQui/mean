  'use strict';

  angular
  .module('templates')
  .directive('chooseTemplate', ['$rootScope', '$uibModal', function AddOp($rootScope, $uibModal) {
    var directive = {
      restrict: 'E',
      link: link,
      scope: {
        choose: '&'
      },
      templateUrl: 'modules/templates/client/directives/choose-template.html',
      controller: 'ChooseTemplateCtrl'
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
  .controller('ChooseTemplateCtrl', ['$scope', '$uibModal', 'TemplatesService', function($scope, $uibModal, TemplatesService) {
    // $scope.create = create;
    $scope.templates = TemplatesService.query();
    // $scope.templates = [{
    //   shortName: 'constText',
    //   name: 'Constante texte'
    // },
    // {
    //   shortName: 'markup',
    //   name: 'Markup'
    // },
    // {
    //   shortName: 'variable',
    //   name: 'Lien vers une variable'
    // }
    //   ];

    $scope.selectTemplate = function(template) {
      console.log('selecttemplate...' + template.title);
      $scope.choose({ template: template });
    }
  }]);

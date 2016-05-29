(function () {
  'use strict';

  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  ArticlesController.$inject = ['operandService', '$rootScope', '$scope', '$state', 'articleResolve', '$window', 'Authentication', '$compile'];

  function ArticlesController(operandService, $rootScope, $scope, $state, article, $window, Authentication, $compile) {
    var vm = this;

    vm.article = article;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.AA='BBB';
    // $rootScope.root='myroot';

    // angular.each(article.operand)
    // vm.precompiled = $compile(article.content)($scope);


    // vm.calculatePreCompiled = function(op, build) {
    //   console.log('calc:'+op.type);
    //   if (op.type==='constText') {
    //     if (build) {
    //       return '<op-consttext build><content>' + op.textConst + '</content></op-consttext>';
    //     } else {
    //       return '<op-consttext><content>' + op.textConst + '</content></op-consttext>';
    //     }
    //   } else if (op.type==='markup') {
    //     var st = op.markup;
    //     var elems = {};
    //     angular.forEach(op.operands, function(child) {
    //       elems[child.key] = vm.calculatePreCompiled(child, build);
    //       console.log('iterate...'+child.key+' '+vm.calculatePreCompiled(child, build));
    //     });
    //     // var view = {
    //     //   title: 'Joe',
    //     //   calc: 'ppp'
    //     // };
    //     // var Mustache = require('Mustache');
    //     var output = Mustache.render(op.markup, elems); // eslint-disable-line
    //     console.log('output==='+output);


    //     if (build) {
    //       return '<op-markup build><markup>' + output + '</markup></op-markup>';
    //     } else {
    //       return '<op-markup><markup>' + output + '</markup></op-markup>';
    //     }
    //     // return '<op-markup><markup>aa</markup></op-markup>';
    //   } else {
    //     if (build) {
    //       return 'NotKnown(build)';
    //     } else {
    //       return 'NotKnown';
    //     }
    //   }
    // }
    // vm.precompiled = vm.calculatePreCompiled(vm.article.operand, false);
    var refresCompiled= function() {
      vm.article.compiled = operandService.transform(vm.article.operand, false);
      $scope.build = operandService.transform(vm.article.operand, true);
    }

    $scope.root='start';
    refresCompiled();
    // if (vm.article.operand) {
    //   vm.precompiled = operandService.transform(vm.article.operand, false);
    //   vm.article.compiled = operandService.transform(vm.article.operand, false);
    //   $scope.compiled = operandService.transform(vm.article.operand, false);
    //   $scope.build = operandService.transform(vm.article.operand, true);
    // }
    // vm.build = vm.calculatePreCompiled(vm.article.operand, true);
    // vm.precompiled = $scope.precompiled;


    vm.create = function(type) {
      console.log('AAcreateeeeeee' + type);
    }
    vm.update = function(operand) {
      console.log('BBcreateeeeeee' + operand);
      vm.article.operand = operand;
      refresCompiled();
      // vm.precompiled = operandService.transform(vm.article.operand, false);
      // vm.build = operandService.transform(vm.article.operand, true);
    }
    // Remove existing Article
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.article.$remove($state.go('articles.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.article._id) {
        vm.article.$update(successCallback, errorCallback);
      } else {
        vm.article.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('articles.view', {
          articleId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

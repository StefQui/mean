(function () {
  'use strict';

  angular
    .module('orgas')
    .controller('OrgasController', OrgasController);

  OrgasController.$inject = ['operandService', '$rootScope', '$scope', '$state', 'orgaResolve', '$window', 'Authentication', '$compile'];

  function OrgasController(operandService, $rootScope, $scope, $state, orga, $window, Authentication, $compile) {
    var vm = this;

    console.log('orgaController inited');
    vm.orga = orga;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.AA='BBB';
    // $rootScope.root='myroot';

    // angular.each(orga.operand)
    // vm.precompiled = $compile(orga.content)($scope);


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
    // vm.precompiled = vm.calculatePreCompiled(vm.orga.operand, false);
    var refresCompiled= function() {
      vm.orga.compiled = operandService.transform(vm.orga.operand, false);
      $scope.build = operandService.transform(vm.orga.operand, true);
    }

    $scope.root='start';
    refresCompiled();
    // if (vm.orga.operand) {
    //   vm.precompiled = operandService.transform(vm.orga.operand, false);
    //   vm.orga.compiled = operandService.transform(vm.orga.operand, false);
    //   $scope.compiled = operandService.transform(vm.orga.operand, false);
    //   $scope.build = operandService.transform(vm.orga.operand, true);
    // }
    // vm.build = vm.calculatePreCompiled(vm.orga.operand, true);
    // vm.precompiled = $scope.precompiled;


    vm.create = function(type) {
      console.log('AAcreateeeeeee' + type);
    }
    vm.update = function(operand) {
      console.log('BBcreateeeeeee' + operand);
      vm.orga.operand = operand;
      refresCompiled();
      // vm.precompiled = operandService.transform(vm.orga.operand, false);
      // vm.build = operandService.transform(vm.orga.operand, true);
    }
    // Remove existing Orga
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.orga.$remove($state.go('orgas.list'));
      }
    }

    // Save Orga
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.orgaForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.orga._id) {
        vm.orga.$update(successCallback, errorCallback);
      } else {
        vm.orga.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('orgas.view', {
          orgaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

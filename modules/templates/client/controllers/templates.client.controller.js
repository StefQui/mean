(function () {
  'use strict';

  angular
    .module('templates')
    .controller('TemplatesController', TemplatesController);

  TemplatesController.$inject = ['$rootScope', '$scope', '$state', 'templateResolve', '$window', 'Authentication', '$compile'];

  function TemplatesController($rootScope, $scope, $state, template, $window, Authentication, $compile) {
    var vm = this;

    vm.template = template;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.AA='BBB';
    // $rootScope.root='myroot';

    // angular.each(template.operand)
    // vm.precompiled = $compile(template.content)($scope);


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
    // vm.precompiled = vm.calculatePreCompiled(vm.template.operand, false);

    vm.create = function(type) {
      console.log('AAcreateeeeeee' + type);
    }
    vm.update = function(operand) {
      console.log('BBcreateeeeeee' + operand);
      vm.template.operand = operand;
      // vm.precompiled = operandService.transform(vm.template.operand, false);
      // vm.build = operandService.transform(vm.template.operand, true);
    }
    // Remove existing Template
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.template.$remove($state.go('templates.list'));
      }
    }

    // Save Template
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.templateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.template._id) {
        vm.template.$update(successCallback, errorCallback);
      } else {
        vm.template.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('templates.view', {
          templateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());

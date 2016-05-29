(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('operandService', operandService);

  function operandService() {
    var shouldRender;
    var service = {
      transform: transform
    };


    return service;

    // Add new menu object by menu id
    function transform(op, build) {
      if (!op) {
        return null;
      }
      if (op.type==='constText') {
        if (build) {
          return '<op-consttext build>' + op.textConst + '</op-consttext>';
        } else {
          return '<op-consttext>' + op.textConst + '</op-consttext>';
        }
      } else if (op.type==='variable') {
        if (build) {
          return '<op-variable build varid=\"'+op.varId+'\"></op-variable>';
        } else {
          return '<op-variable varid=\"'+op.varId+'\"></op-variable>';
        }
      } else if (op.type==='markup') {
        var st = op.markup;
        var elems = {};
        angular.forEach(op.operands, function(child) {
          elems[child.key] = transform(child, build);
          console.log('iterate...'+child.key+' '+transform(child, build));
        });
        // var view = {
        //   title: 'Joe',
        //   calc: 'ppp'
        // };
        // var Mustache = require('Mustache');
        var output = Mustache.render(op.markup, elems); // eslint-disable-line
        console.log('output==='+output);


        if (build) {
          return '<op-markup build>' + output + '</op-markup>';
        } else {
          return '<op-markup>' + output + '</op-markup>';
        }
        // return '<op-markup><markup>aa</markup></op-markup>';
      } else {
        if (build) {
          return 'NotKnown(build)';
        } else {
          return 'NotKnown';
        }
      }
    }



  }
}());

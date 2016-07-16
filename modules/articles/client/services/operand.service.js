(function () {
  'use strict';

  angular
    .module('articles.services')
    .factory('operandService', operandService);

  function operandService() {
    var shouldRender;
    var service = {
      transform: transform,
      transformElement: transformElement,
      addPath: addPath,
      addListeners: addListeners
    };

    function addPath(element1, attrs) {
      var root = '<span style="color:orange;background:yellow;font-size:80%"><b></b></span>';
      if (attrs.path) {
        element1.prepend('<span style="color:green;background:yellow;font-size:80%"><b>'+root+attrs.path+'</b></span>');
      } else {
        element1.prepend('<span style="color:green;background:yellow;font-size:80%"><b>'+root+'</b></span>');
      }
    }

    function addListeners(element1, attrs) {
      if (attrs.emitters) {
        var res = '<span style="color:white;background:grey;font-size:80%">ListensTo:</span>';
        res+='<span style="color:white;background:green;font-size:80%">'+attrs.emitters+'</span><br/>';
        element1.prepend(res);
      }

    }


    return service;

    // Add new menu object by menu id
    function transform(op, build, path) {
      if (!op) {
        return null;
      }

      var sp = ' path="'+path+'"';
      var se = '';
      if (op.emitters) {
        se = ' emitters="'+op.emitters+'"';
      }
      if (op.type==='constText') {
        if (build) {
          return '<op-consttext '+sp+'>' + op.textConst + '</op-consttext>';
        } else {
          return '<op-consttext '+sp+'>' + op.textConst + '</op-consttext>';
        }
      } else if (op.type==='variable') {
        if (build) {
          return '<op-variable build varid=\"'+op.varId+'\" '+sp+'></op-variable>';
        } else {
          return '<op-variable varid=\"'+op.varId+'\" '+sp+'></op-variable>';
        }
      } else if (op.type==='create') {
        if (build) {
          return '<op-create build '+sp+'></op-create>';
        } else {
          return '<op-create '+sp+'></op-create>';
        }
      } else if (op.type==='list') {
        if (build) {
          console.log('opcompiled=='+op.tag+' '+op.compiled);
          var tag = '';
          if (op.tag) {
            tag=' tag="'+op.tag+'"';
          }
          console.log('tag=='+tag+' --- '+op.compiled);
          return '<op-list build '+sp+' '+se+tag+'>'+op.compiled+'</op-list>';
        } else {
          return '<op-list '+sp+' '+se+tag+'>'+op.compiled+'</op-list>';
        }
      } else if (op.type==='form') {
        // if (build) {
        //   return '<op-formulaire build '+sp+' '+se+'><h1>build</h1></op-formulaire>';
        // } else {
        //   return '<op-formulaire '+sp+' '+se+'><h1>pasbuild</h1></op-formulaire>';
        // }
        if (build) {
          // return '<op-formulaire ng-controller="FormCtrl as vm" build '+sp+' '+se+'>BUILD-{{AA}}-{{vm.AA}}-AFTER'+op.compiled+'</op-formulaire>';
          return '<op-formulaire build '+sp+' '+se+'>'+op.compiled+'</op-formulaire>';
        } else {
          return '<op-formulaire '+sp+' '+se+'>'+op.compiled+'</op-formulaire>';
        }
        // if (build) {
        //   return '<op-formulaire build html="'+op.compiled+'" '+sp+' '+se+'></op-formulaire>';
        // } else {
        //   return '<op-formulaire html="'+op.compiled+'" '+sp+' '+se+'></op-formulaire>';
        // }
      } else if (op.type==='markup') {
        var st = op.markup;
        var elems = {};
        var pathToAdd;
        if (!path) {
          path = '';
        }
        var output = op.markup || '<i>No markup!</i>';
        if (op.operands && op.operands.length>0) {
          angular.forEach(op.operands, function(child) {
            elems[child.key] = transform(child, build, path+'/'+child.key);
          // console.log('iterate...'+child.key+' '+transform(child, build));
          });
        // var view = {
        //   title: 'Joe',
        //   calc: 'ppp'
        // };
        // var Mustache = require('Mustache');

          output = Mustache.render(op.markup || '<i>No markup!</i>', elems); // eslint-disable-line

        // var output = op.markup || '<i>No markup!</i>'; // eslint-disable-line
          // console.log('output==='+output);
        }

        var el = angular.element('<args></args>');
        angular.forEach(op.args, function(arg) {
          var elc = angular.element('<arg></arg>');
          elc.attr('alias', arg.alias);
          elc.attr('argtypeid', arg.argTypeId);
          if (arg.argTypeId === 'selectResourceMethod') {
            elc.attr('selectedalias', arg.selectedAlias);
          }
          el.append(elc);
          // console.log('iterate...'+child.key+' '+transform(child, build));
        });

        console.log('<op-markup build path="'+path+'"><content>' + output + '</content>'+el[0].outerHTML+'</op-markup>');
        if (build) {
          return '<op-markup build path="'+path+'"><content>' + output + '</content>'+el[0].outerHTML+'</op-markup>';
        } else {
          return '<op-markup path="'+path+'">' + output + '</op-markup>';
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



    function transformElement(op, build, path) {
      if (!op) {
        return null;
      }

      var sp = ' path="'+path+'"';
      var se = '';
      if (op.emitters) {
        se = ' emitters="'+op.emitters+'"';
      }
      if (op.type==='constText') {
        var el = angular.element('<op-consttext></op-consttext>');
        el.attr({ path: path, emitters: op.emitters });
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else if (op.type==='variable') {
        var el = angular.element('<op-variable></op-variable>');
        el.attr({ path: path, emitters: op.emitters, varId: op.varId });
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else if (op.type==='create') {
        var el = angular.element('<op-create></op-create>');
        el.attr({ path: path });
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else if (op.type==='list') {
        var el = angular.element('<op-list></op-list>');
        el.attr({ path: path, emitters: op.emitters, tag: op.tag });
        el.html(op.compiled);
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else if (op.type==='form') {
        var el = angular.element('<op-formulaire></op-formulaire>');
        el.attr({ path: path, emitters: op.emitters });
        el.html(op.compiled);
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else if (op.type==='markup') {
        var st = op.markup;
        var elems = {};
        var pathToAdd;
        if (!path) {
          path = '';
        }
        var el = angular.element('<op-markup></op-markup>');
        el.attr({ path: path, emitters: op.emitters });
        angular.forEach(op.operands, function(child) {
          elems[child.key] = transformElement(child, build, path+'.'+child.key).html();
          // console.log('iterate...'+child.key+' '+transform(child, build));
        });
        // var view = {
        //   title: 'Joe',
        //   calc: 'ppp'
        // };
        // var Mustache = require('Mustache');
        var output = Mustache.render(op.markup, elems); // eslint-disable-line
        // console.log('output==='+output);
        el.html(output);
        if (build) {
          el.attr({ build: true });
        }
        return el;
      } else {
        var el = angular.element('<b>NotKnown!</b>');
        return el;
      }
    }



  }
}());

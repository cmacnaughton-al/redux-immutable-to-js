'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isImmutable = isImmutable;
exports.toJS = toJS;
exports.toJSDeep = toJSDeep;
exports.convert = convert;
exports['default'] = immutableToJS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashMapvalues = require('lodash.mapvalues');

var _lodashMapvalues2 = _interopRequireDefault(_lodashMapvalues);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _immutable = require('immutable');

function isImmutable(obj) {
  return _immutable.Iterable.isIterable(obj);
}

function toJS(obj) {
  return obj.toJS();
}

function toJSDeep(obj) {
  /* eslint no-use-before-define: 0 */
  return (0, _lodashMapvalues2['default'])(obj, convert);
}

function convert(obj) {
  if (isImmutable(obj)) {
    return toJS(obj);
  } else if ((0, _lodashIsplainobject2['default'])(obj)) {
    return toJSDeep(obj);
  }
  return obj;
}

function immutableToJS() {
  return function (createStore) {
    return function (reducer, initialState) {
      var store = createStore(reducer, initialState);
      return _extends({}, store, {
        getState: function getState() {
          var state = store.getState();
          return convert(state);
        }
      });
    };
  };
}
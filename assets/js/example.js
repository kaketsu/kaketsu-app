'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MyClass = undefined;

var _jquery = require('jquery');

var _jquery2 = babelHelpers.interopRequireDefault(_jquery);

var MyClass = exports.MyClass = function () {
    function MyClass() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? 'nobody' : arguments[0];
        babelHelpers.classCallCheck(this, MyClass);

        this.name = name;
    }

    babelHelpers.createClass(MyClass, [{
        key: 'getMyName',
        value: function getMyName() {
            return this.name;
        }
    }]);
    return MyClass;
}();

/*.directive('userCheck',function(){
    return {
        restrict: 'A',
        scope: true,
        require:'?^ngModel',
        link: function ($scope, element, attr, model) {
            console.log(model);
          }
    }
})*/
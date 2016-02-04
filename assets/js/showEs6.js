'use strict';

var a = [];

var _loop = function _loop(i) {
  a[i] = function () {
    console.log(i);
  };
};

for (var i = 0; i < 10; i++) {
  _loop(i);
}
a[6]();

function test1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('test');
      resolve('test1');
    }, 3000);
  });
}

var fn = function () {
  var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return test1();

          case 2:
            console.log('hello world');

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return function fn() {
    return ref.apply(this, arguments);
  };
}();

fn();

//解构赋值指定默认值
console.log('解构赋值指定默认值');
var _x = { x: 1 };
var x = _x.x;
var _x$y = _x.y;
var y = _x$y === undefined ? 5 : _x$y;

console.log('x:' + x, 'y:' + y);

//ES6 关于函数的

function log(x) {
  var y = arguments.length <= 1 || arguments[1] === undefined ? 'World' : arguments[1];

  console.log(x, y);
}

log('Hello'); // Hello World
log('Hello', 'China'); // Hello China
log('Hello', ''); // Hello

function foo(_ref) {
  var x = _ref.x;
  var _ref$y = _ref.y;
  var y = _ref$y === undefined ? 5 : _ref$y;

  console.log(x, y);
}

foo({}); // undefined, 5
foo({ x: 1 }); // 1, 5
foo({ x: 1, y: 2 }); // 1, 2
foo(); // TypeError: Cannot read property 'x' of undefined
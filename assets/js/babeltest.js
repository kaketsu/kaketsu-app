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
  return new Promise(function () {
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
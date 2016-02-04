var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); 



function test1(){
  return new Promise(function(resolve,reject){
  	setTimeout(function(){
  		console.log('test');
    	resolve('test1');
  	},3000)
    
  });
}

const fn = async function(){
  await test1();
  console.log('hello world');
}

fn();

//解构赋值指定默认值
console.log('解构赋值指定默认值');
let {x, y=5} = {x: 1};
console.log('x:'+ x,'y:'+ y);


//ES6 关于函数的

function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello


function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined, 5
foo({x: 1}) // 1, 5
foo({x: 1, y: 2}) // 1, 2
foo() // TypeError: Cannot read property 'x' of undefined



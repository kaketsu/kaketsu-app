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

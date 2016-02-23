var myObj = {
 
    specialFunction: function () {
 
    },
 
    anotherSpecialFunction: function () {
 
    },
 
    getAsyncData: function (cb) {
        cb();
    },
 
    render: function () {
        var that = this;
        this.getAsyncData(function () {
            that.specialFunction();
            that.anotherSpecialFunction();
        });
    }
};
 
myObj.render();


function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {
        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }, 500);
    }

    this.seriousGreeting = function(){
        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }.bind(this),500)
    }
}
 
var alice = new Person('Alice');
alice.distractedGreeting();

//这个时候输出的this.nickname是undefined，原因是this指向是在运行函数时确定的，而不是定义函数时候确定的，再因为setTimeout在全局环境下执行，所以this指向setTimeout的上下文：window。

//以前解决这个问题的办法通常是缓存this


alice.seriousGreeting();
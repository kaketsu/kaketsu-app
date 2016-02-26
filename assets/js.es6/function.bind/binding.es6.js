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

//bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：
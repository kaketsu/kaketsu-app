var mainApp = angular.module("mainApp", []);


mainApp.value('fooConfig', {
	config1: true,
	config2: "Default config2 but it can changes"
});


/*
注入service，相当于注入service定义是的function实例。
注入factory，相当于注入factory定义时的函数调用入口。
注入provider，相当于注入provider内$get定义的函数实例的调用
*/


/*
用 Factory 就是创建一个对象，为它添加属性，然后把这个对象返回出来。
你把 service 传进 controller 之后，
在 controller 里这个对象里的属性就可以通过 factory 使用了。
*/

mainApp.factory('foo',function(){

	var private = 'private';
	function getPrivate(){
		return private;
	}

	return {
		publicVariable: 'This is public',
		getPrivate: getPrivate
	}
});

function Foobar() {
    var thisIsPrivate = "Private";
    this.variable = "This is public";
    this.getPrivate = function() {
        return thisIsPrivate;
    };
}
mainApp.factory('foo2', function() {
    return new Foobar();
});

/*
Service 是用"new"关键字实例化的。因此，你应该给"this"添加属性，
然后 service 返回"this"。你把 service 传进 controller 之后，
在controller里 "this" 上的属性就可以通过 service 来使用了。
*/

mainApp.service('myService',function(){
    var _artist = 'HuaJie';
    this.getArtist = function(){
        return _artist;
    }
})

/*
Providers 是唯一一种你可以传进 .config() 函数的 service。
当你想要在 service 对象启用之前，先进行模块范围的配置，那就应该用 provider。
*/

mainApp.config(function($provide) {
    $provide.provider('greeting', function(){
        this.$get = function(){
            return function(name){
                alert("Hello, " + name);
            }
        }
    })
}); 


mainApp.controller('mainCtrl',function($scope,$http,$timeout,foo,fooConfig){
	console.log('start main');

	//所有的service都是单例，所有修改一处之后其他地方都会改变
    console.log(fooConfig);
	fooConfig.variable = 'modified public';

})


.controller('subCtrl1',function($scope, $http, foo, fooConfig){
    console.log('start sub1');
    console.log(fooConfig);
    console.log(foo.getPrivate());

})



mainApp.controller('secondCtrl',function($scope,$http,$timeout,foo,fooConfig){
/*
    //第一课是Promise，这周一定要理解设计思路
    function doSth() {
        return new Promise(function (resolve, reject) {
            //做点什么异步的事情
            //结束的时候调用 resolve，比如：
            setTimeout(function () {
                console.log('doSth');
                resolve('call me');
            }, 1000);
        })
    }

   function doSth2() {
        return new Promise(function (resolve, reject) {
            //做点什么异步的事情
            //结束的时候调用 resolve，比如：
            setTimeout(function () {
                console.log('doSth2');
                resolve('hello qiuqiu');
            }, 3000);
        })
    }

    function doSth3() {
        console.log('doSth3');
        return Promise.resolve(doSth);
    }

    //doSth().then(doSth2).then(doSth3).then(doSth);



    async function test(){
            console.log('test start');
            console.log(await doSth2());
            console.log('test end');
        }

    function test2(){
        setTimeout(function(){
            console.log('test2 async');
        },2500)
    }

    test();
    test2();









    function $http(url) {
        var core = {
            ajax:function(method, url, args){
                var client = new XMLHttpRequest();
                console.log(method + url + args);
                client.open(method, url);
                client.send();
                client.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        // Performs the function "resolve" when this.status is equal to 2xx
                        console.log(this.response)
                    } else {
                        // Performs the function "reject" when this.status is different than 2xx
                        console.log(this.statusText);
                    }
                };
                client.onerror = function () {
                    console.log(this.statusText);
                };
            }
        }

        return {
            'get': function (args) {
                return core.ajax('GET', url, args);
            },
            'post': function(args){
                return core.ajax('POST', url, args);
            }
        }
    }

    //$http('/utils/getCityList').get({coId:'all'});


    */
})


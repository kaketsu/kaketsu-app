var mainApp = angular.module("mainApp", []);
mainApp.controller('mainCtrl',function($scope,$http,$timeout){
	$scope.p = 'hello huajie';



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
                resolve();
            }, 3000);
        })
    }

    function doSth3() {
        console.log('doSth3');
        return Promise.resolve(doSth);
    }

    doSth().then(doSth2).then(doSth3).then(doSth);


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

    $http('/utils/getCityList').get({coId:'all'});


})


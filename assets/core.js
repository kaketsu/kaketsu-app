var mainApp = angular.module("mainApp", []);
mainApp.controller('mainCtrl',['$scope',function($scope){
		$scope.gameName = 'we love huaqiuqiu';
	}
])

//在没有ng-app的时候要进行手动启动
/*angular.element(document).ready(function(){
	angular.bootstrap(document,['mainApp']);
})*/

//ng-app若不嵌套，是可以在一个页面中存在多个的. 但是angular只会自动启动第一个，可以手动启动第二个。
//若你有jQuery，则会绑定引入jQuery

console.log(mainApp);

//bootstrap 是ng的启动函数
//bootstrap 函数会创建并且返回一个 injector ，此注射器就是根注射器。



//3.2 provider 和 injector 
//
//在controller中  这种方式叫做推断型注入 函数的参数名称必须要和被注入的对象完全相同。
var subCtrl = function($scope){
	$scope.gameName = 'we love huaqiuqiu,too';
}
mainApp.controller('subCtrl',subCtrl)


//注射器，providerInjector 和 instanceInjector

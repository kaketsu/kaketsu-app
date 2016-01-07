myApp.controller('testCtrl', function ($scope, $http) {
    "use strict";
    $scope.message = 'hello jesscia';
    $scope.qq = {name: 'huaqiuiqu', age: 24, gender: 'male'};

})


myApp.directive('testdir', function ($compile, $timeout, $filter, $locale) {
    return {
        restrict: "E",
        template: "<div class='card'>",
        replace: true,
        link: function (scope, element, attrs) {
            var qq = scope.$eval(attrs.data);
            element.append("<div>name : " + qq.name + "</div>")
                .append("<div>gender : " + qq.gender + "</div>")
                .append("<div>age : " + qq.age + "</div>")

            scope.$watch(qq, function (newValue, oldValue, scope) {
                console.log(newValue);
            },true)

            /*setInterval(function () {
                scope.$apply("qq.age=qq.age+1;")
            }, 2000)*/
        }
    };
})
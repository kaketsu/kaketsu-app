var app = angular.module('app', []);

angular.element(document).ready(function readyHandler() {
    angular.bootstrap(document, ['app']);
});

app.directive('superset', function() {
  return {
    restrict: 'EA',
    replace: true,
    scope: true,
    controller: function($scope){
      $scope.isSelect = true;
      var ctrl = this;
      
      ctrl.clickFnA = function(){
          $scope.isSelect = !$scope.isSelect;
      }; 
      ctrl.clickFnB = function(){
          $scope.isSelect = !$scope.isSelect;
      }; 
    }
  };
});

app.directive('subsetA', function() {
  return {
    restrict: 'EA',
    replace: true,
    require: '^superset',
    scope: true,
    template: '<p><button ng-click="clickFnA()">点我</button>  {{isSelect}}</p></div>',
    link: function($scope, tElement, tAttrs, ctrl){
      $scope.clickFnA = ctrl.clickFnA;
    }
  };
});

app.directive('subsetB', function() {
  return {
    restrict: 'EA',
    replace: true,
    require: '^superset',
    scope: true,
    template: '<p><button ng-click="clickFnB()">点我 </button> {{isSelect}}</p>',
    link: function($scope, tElement, tAttrs, ctrl){
      $scope.clickFnB = ctrl.clickFnB;
    }
  };
});
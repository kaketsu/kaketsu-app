import $ from 'jquery'
export class MyClass {
  constructor(name = 'nobody') {
    this.name = name;
  }
  getMyName() {
    return this.name;
  }
}


    .directive('userCheck',function(){
        return {
            restrict: 'A',
            scope: true,
            require:'?^ngModel',
            link: function ($scope, element, attr, model) {
                console.log(model);

            }
        }
    })

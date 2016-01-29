angular.module('customControl'，[]). 
	directive('contenteditable', function(){
		return {
			restrict : 'A',
			require: '?ngModel',
			link:function(scope, element, attrs, ngModel){
				
			}

		}
	}) 
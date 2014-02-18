var module = angular.module('checkoutthedrop', ['ngResource']);

module.controller('HomeController', function($scope, $resource){
	var Drop = $resource('/drop');

	$scope.createDrop = function(dropInfo){
		var antoine = Drop.save([], dropInfo);
	};
});

angular.bootstrap(document, ['checkoutthedrop']);
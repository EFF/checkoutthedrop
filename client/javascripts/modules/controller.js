define(function (){
	var controller = function ($scope, DropService) {
		$scope.antoine = 'pieeerrre'

		DropService.yo($scope.antoine)
	}

	controller.$inject = ['$scope', 'DropService'];
	return controller;
});
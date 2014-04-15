var module = angular.module('checkoutthedrop', ['angular-flash.service', 'angular-flash.flash-alert-directive', 'ngResource', 'angulartics', 'angulartics.google.analytics'])
    .config(['flashProvider', function (flashProvider){
            flashProvider.errorClassnames.push('alert-danger');
            flashProvider.successClassnames.push('alert-success');
        }]);

var HomeController = function($scope, $resource, flash, DropService){
    $scope.soundcloudREGEX = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;
    $scope.timeREGEX = /^[0-9]:[0-5][0-9]$/;

    var Drop = $resource('/drop');

    var createSuccessCallback = function(data){
        flash.success = "Thanks for submitting your drop !";
        $scope.newDrop = {};
    };

    var errorCallback = function(err){
        flash.error = err.data;
    };

    $scope.createDrop = function(dropInfo){
        Drop.save([], dropInfo, createSuccessCallback, errorCallback);
    };

};

var DropPlayerController = function($scope, DropService){

    var getDropSuccessCallback = function (data) {
      $scope.current_drop = data;
    };
    DropService.getRandom(getDropSuccessCallback);
};

var DropService = function ($http) {
    var service = {};

    service.getRandom = function (successCallback){
            $http.get('/drops/random')
              .success(successCallback)
              .error(function (err){
                console.log(err);
              });
    };

    return service;
};

var scrollOnClick = function () {
        return{
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    var scrollTo = $(attrs.scrollToId).offset().top;
                    $('body').animate({scrollTop: scrollTo}, 'slow', 'swing');
                });
            }
        };
    };

module.factory('DropService', ['$http', DropService]);
module.controller('DropPlayerController', ['$scope', 'DropService', DropPlayerController]);
module.controller('HomeController', ['$scope', '$resource', 'flash', 'DropService', HomeController]);
module.directive('scrollOnClick', scrollOnClick);

angular.bootstrap(document, ['checkoutthedrop']);

var module = angular.module('checkoutthedrop', ['angular-flash.service', 'angular-flash.flash-alert-directive', 'ngResource'])
        .config(function (flashProvider){
            flashProvider.errorClassnames.push('alert-danger');
            flashProvider.successClassnames.push('alert-success');
        });

var HomeController = function($scope, $resource, flash){
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

module.controller('HomeController', ['$scope', '$resource', 'flash', HomeController]);
module.directive('scrollOnClick', scrollOnClick);

angular.bootstrap(document, ['checkoutthedrop']);
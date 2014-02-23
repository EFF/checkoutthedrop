var module = angular.module('checkoutthedrop', ['ngResource']);

var HomeController = function($scope, $resource){
    $scope.soundcloudREGEX = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;
    $scope.timeREGEX = /^[0-9]:[0-5][0-9]$/;
    var Drop = $resource('/drop');

    $scope.createDrop = function(dropInfo){
        Drop.save([], dropInfo);
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

module.controller('HomeController', ['$scope', '$resource', HomeController]);
module.directive('scrollOnClick', scrollOnClick);

angular.bootstrap(document, ['checkoutthedrop']);
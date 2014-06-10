var module = angular.module('checkoutthedrop', ['angular-flash.service', 'angular-flash.flash-alert-directive', 'ngResource', 'angulartics', 'angulartics.google.analytics'])
    .config(['flashProvider', function (flashProvider) {
        flashProvider.errorClassnames.push('alert-danger');
        flashProvider.successClassnames.push('alert-success');
    }]);

var SubmitController = function ($scope, flash, DropService) {
    $scope.soundcloudREGEX = /^https?:\/\/(soundcloud.com|snd.sc)\/(.*)$/;
    $scope.timeREGEX = /^[0-9]:[0-5][0-9]$/;

    var createSuccessCallback = function (data) {
        flash.success = "Thanks for submitting your drop !";
        $scope.newDrop = {};
    };

    var createErrorCallback = function (err) {
        flash.error = err.data;
    };

    $scope.createDrop = function (dropInfo) {
        DropService.create(dropInfo, createSuccessCallback, createErrorCallback);
    }

};

var DropPlayerController = function ($scope, DropService) {
    $scope.scWidget = SC.Widget(document.getElementById('drop_player'));

    var convertDropTimeToMilliseconds = function (time) {
        splittedTime = time.split(".");
        return (parseInt(splittedTime[0]*60) + parseInt(splittedTime[1]))*1000
    };

    var onLoadProgress = function (e){
        if (e.loadedProgress && e.loadedProgress === 1) {
            var milliseconds = convertDropTimeToMilliseconds($scope.currentDrop.dropTime);
            $scope.scWidget.seekTo(milliseconds);
            $scope.scWidget.unbind(SC.Widget.Events.LOAD_PROGRESS);
        }
    };

    var onPlayerLoaded = function() {
        $scope.scWidget.play();
        $scope.scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, function(){
            $scope.scWidget.setVolume(0);
        });
        $scope.scWidget.bind(SC.Widget.Events.LOAD_PROGRESS, onLoadProgress);
    };

    var playerOptions = {
        auto_play: false,
        buying: false,
        liking: true,
        download: false,
        sharing: false,
        show_artwork: true,
        show_comments: false,
        show_playcount: false,
        show_user: false,
        visual: true,
        callback: onPlayerLoaded
    };

    var getDropSuccessCallback = function (data) {
        if (data) {
            $scope.currentDrop = data;
            $scope.scWidget.load(data.soundcloudUrl, playerOptions);
        }
    };

    DropService.getRandom(getDropSuccessCallback);
};

var DropService = function ($http, $resource) {
    var Drop = $resource('/drop');
    var service = {};

    service.create = function (dropInfo, successCallback, errorCallback) {
        Drop.save([], dropInfo, successCallback, errorCallback);
    };

    service.getRandom = function (successCallback) {
        $http.get('/drops/random')
            .success(successCallback)
            .error(function (err) {
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

module.factory('DropService', ['$http', '$resource', DropService]);
module.controller('DropPlayerController', ['$scope', 'DropService', DropPlayerController]);
module.controller('SubmitController', ['$scope', 'flash', 'DropService', SubmitController]);
module.directive('scrollOnClick', scrollOnClick);

angular.bootstrap(document, ['checkoutthedrop']);

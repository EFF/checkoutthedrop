define(['angular', './controller', './service'], function (angular, ctrl, service) {
    var module = angular.module('HomeModule', []);

    module.factory('DropService', service);

    module.controller('HomeController', ctrl);

    return module;
});
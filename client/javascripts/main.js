require.config({
    baseUrl: './javascripts',
    paths: {
        domReady: '//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min',
        angular: '../lib/angular/angular.min',
    },
    shim: {
        angular: {exports: 'angular'},
    },
});

define(['require', 'angular', 'app'], function (require, angular) {
    require(['domReady!'], function (document) {
        angular.bootstrap(document, ['check-out-the-drop']);
    });
});
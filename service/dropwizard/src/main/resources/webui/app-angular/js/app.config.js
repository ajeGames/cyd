(function() {
    'use strict';

    angular
        .module('StoryTime')
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when('/catalog', {
                templateUrl: 'templates/pages/catalog/index.html',
                controller: 'CatalogController',
                controllerAs: 'catCtrl'
            })
            .when('/reader/:storyKey/:chapterId', {
                templateUrl: 'templates/pages/reader/index.html',
                controller: 'ReaderController',
                controllerAs: 'readerCtrl'
            })
            .when('/reader/:storyKey', {
                redirectTo: '/reader/:storyKey/0'
            })
            .when('/editor/new', {
                templateUrl: 'templates/pages/editor/index.html',
                controller: 'EditorController',
                controllerAs: 'editorCtrl'
            })
            .when('/editor/:storyKey', {
                templateUrl: 'templates/pages/editor/index.html',
                controller: 'EditorController',
                controllerAs: 'editorCtrl'
            })
            .when('/editor/:storyKey/:chapterId', {
                templateUrl: 'templates/pages/editor/index.html',
                controller: 'EditorController',
                controllerAs: 'editorCtrl'
            })
            .otherwise({
                redirectTo: '/catalog'
            });
    }
})();

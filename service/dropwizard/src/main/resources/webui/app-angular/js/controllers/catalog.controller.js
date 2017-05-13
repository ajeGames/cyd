(function() {
    'use strict';

    angular
        .module('StoryTime')
        .controller('CatalogController', CatalogController);

    CatalogController.$inject = ['RemoteData', 'StoryContext'];

    function CatalogController(RemoteData, StoryContext) {

        var vm = this;
        vm.catalog = StoryContext.getSummaries();
        vm.reload = reload;
        vm.deleteStory = deleteStory;

        if (!hasCachedSummaries()) {
            loadCatalog();
        }

        function hasCachedSummaries() {
            for (var property in vm.catalog) {
                if (vm.catalog.hasOwnProperty(property)) {
                    return true;
                }
            }
            return false;
        }

        function loadCatalog() {
            RemoteData.fetchAllSummaries()
                .then(function(stories) {
                    vm.catalog = StoryContext.cacheSummaries(stories);
                });
        }

        function reload() {
            loadCatalog();
        }

        function deleteStory(storyKey) {
            RemoteData.deleteStory(storyKey)
                .then(function(data) {
                    reload();
                });
        }
    }

})();

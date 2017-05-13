(function() {
    'use strict';

    angular
        .module('StoryTime')
        .controller('EditorController', EditorController);

    EditorController.$inject = ['$routeParams', 'RemoteData', 'StoryContext'];

    function EditorController($routeParams, RemoteData, StoryContext) {
        var vm = this;
        vm.addChapterOption = addChapterOption;
        vm.draftChapter = {};
        vm.draftSummary = ($routeParams.storyKey === undefined) ? {} : StoryContext.getActiveStorySummary();
        vm.isEditChapter = isEditChapter;
        vm.isEditSummary = isEditSummary;
        vm.mode = "summary";
        vm.nextChapterTeaser = null;
        vm.paramChapterId = $routeParams.chapterId;
        vm.paramStoryKey = $routeParams.storyKey;
        vm.removeChapterOption = removeChapterOption;
        vm.saveDraftChapter = saveDraftChapter;
        vm.saveDraftSummary = saveDraftSummary;

        activate();

        function activate() {
            if (vm.paramStoryKey != undefined) {
                if (vm.paramStoryKey != vm.draftSummary.key) {
                    reload();
                } else {
                    setDraftChapter();
                }
            } else {
                vm.draft = {};
                vm.draftChapter = {};
                vm.mode = "summary";
            }
        }

        function reload() {
            loadStory().then(function() {
                setDraftChapter();
            });
        }

        function loadStory() {
            return RemoteData.fetchStory(vm.paramStoryKey)
                .then(function(story) {
                    StoryContext.cacheStory(story);
                    vm.draftSummary = StoryContext.getActiveStorySummary();
                });
        }

        function setDraftChapter() {
            if (vm.paramChapterId != undefined) {
                vm.draftChapter = StoryContext.getChapter(vm.paramChapterId);
                vm.mode = "chapter";
            }
        }

        function isEditChapter() {
            return vm.mode === "chapter";
        }

        function isEditSummary() {
            return vm.mode === "summary";
        }

        function saveDraftSummary() {
            var result;
            if (vm.draftSummary.key == null) {
                result = RemoteData.createStory(vm.draftSummary);
            } else {
                result = RemoteData.updateStory(vm.draftSummary);
            }
            result.then(function(summary) {
                vm.paramStoryKey = summary.key;
                reload();
            });
        }

        function saveDraftChapter() {
            RemoteData.updateChapter(vm.draftSummary.key, vm.draftChapter)
                .then(function(chapter) {
                    reload();
                });
        }

        function addChapterOption() {
            if (vm.nextChapterTeaser === null) {
                alert('Provide some text for the teaser.');
                return;
            }
            RemoteData.createChapter(vm.draftSummary.key, vm.draftChapter.id, vm.nextChapterTeaser)
                .then(function(chapter) {
                    vm.nextChapterTeaser = null;
                    reload();
                });
        }

        function removeChapterOption(id) {
            if (id === undefined || id === null) {
                alert('Chapter ID was not provided');
                return;
            }
            RemoteData.deleteChapter(vm.draftSummary.key, id)
                .then(function(data) {
                    reload();
                });
        }
    }
})();

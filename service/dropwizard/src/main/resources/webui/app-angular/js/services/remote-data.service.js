/* connects with the backend API */

(function () {
    'use strict';

    angular
        .module('StoryTime')
        .factory('RemoteData', RemoteDataAccessFactory);

    RemoteDataAccessFactory.$inject = ['$http', '$q'];

    function RemoteDataAccessFactory($http, $q) {
        return {
            createChapter: createChapter,
            createStory: createStory,
            deleteChapter: deleteChapter,
            deleteStory: deleteStory,
            fetchAllSummaries: fetchAllSummaries,
            fetchChapter: fetchChapter,
            fetchStory: fetchStory,
            fetchStorySummary: fetchStorySummary,
            updateStory: updateStory,
            updateChapter: updateChapter
        };

        function fetchAllSummaries() {
            return $http.get("../api/storytime/stories")
                .then(handleSuccess).catch(handleError);
        }

        function fetchStorySummary(key) {
            return $http.get("../api/story/" + key)
                .then(handleSuccess).catch(handleError);
        }

        function fetchStory(key) {
            return $http.get("../api/story/" + key + "/full")
                .then(handleSuccess).catch(handleError);
        }

        function createStory(story) {
            return $http.post("../api/story", story)
                .then(handleSuccess).catch(handleError);
        }

        function updateStory(story) {
            return $http.put("../api/story/" + story.key, story)
                .then(handleSuccess).catch(handleError);
        }

        function deleteStory(key) {
            return $http.delete("../api/story/" + key)
                .then(handleSuccess).catch(handleError);
        }

        function fetchChapter(storyKey, id) {
            return $http.get("../api/story/" + key + "/chapter/" + id)
                .then(handleSuccess).catch(handleError);
        }

        function updateChapter(storyKey, chapter) {
            return $http.put("../api/story/" + storyKey + "/chapter/" + chapter.id, chapter)
                .then(handleSuccess).catch(handleError);
        }

        function createChapter(storyKey, fromChapterId, teaser) {
            return $http.post("../api/story/" + storyKey + "/chapter/" + fromChapterId, teaser)
                .then(handleSuccess).catch(handleError);
        }

        function deleteChapter(storyKey, chapterId) {
            return $http.delete("../api/story/" + storyKey + "/chapter/" + chapterId)
                .then(handleSuccess).catch(handleError);
        }

        // "PRIVATE" FUNCTIONS

        function handleSuccess(response) {
            return response.data;
        }

        function handleError(response) {

            console.log('Problem with call to server: ' + error.data);

            // handle unexpected format
            if (!angular.isObject(response.data) || !response.data.message) {
            return $q.reject("An unknown error occurred.");
            }

            // Otherwise, use expected error message.
            return $q.reject(response.data.message);
        }
    }

})();

import fetch from 'isomorphic-fetch';
// import storytimeServerEndpoint from '../env';

const serviceEndpoint = 'http://localhost:3000/api';

export function ping() {
  return fetch(`${ serviceEndpoint }/status`);
}

export function getStorySummaries() {
  return fetch(`${ serviceEndpoint }/stories`);
}

export function getStorySummary(storyKey, version) {
  return fetch(`${ serviceEndpoint }/stories/${ storyKey }/${ version }`);
}

export function getChapter(storyKey, version, chapterId) {
  return fetch(`${ serviceEndpoint }/stories/${ storyKey }/${ version }/chapters/${ chapterId }`);
}

/*
 import axios from 'axios';

 class StoryTimeAPI {
 loadSummaries() {
 const endpoint = '/api/storytime/stories';
 axios.get(endpoint)
 .then(response => (console.log(response.data)))
 .catch(response => (console.log(response.message)));
}

loadStory(storyKey) {  // eslint-disable-line
  const endpoint = '{this.uriBase}/story/${storyKey}/full';
  axios.get(endpoint)
    .then(response => (console.log(response.data)))
    .catch(response => (console.log(response.message)));
}
}
*/
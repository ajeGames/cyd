import fetch from 'isomorphic-fetch';
// import storytimeServerEndpoint from '../env';

const serviceEndpoint = 'http://localhost:3000/api';

export function ping() {
  return fetch(`${ serviceEndpoint }/storytime`);
}

export function getStorySummaries() {
  return fetch(`${ serviceEndpoint }/storytime/stories`);
}

export function getStorySummary(storyKey) {
  return fetch(`${ serviceEndpoint }/story/${ storyKey }/summary`);
}

export function getChapter(storyKey, chapterId) {
  return fetch(`${ serviceEndpoint }/story/${ storyKey }/chapters/${ chapterId }`);
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
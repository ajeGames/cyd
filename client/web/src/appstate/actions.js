import { createAction } from 'redux-actions';
import { getStorySummaries, getStorySummary, getChapter } from '../apidata/storytimeApi';

/*
 * Asynchronously processes sequence of actions to fetch story summaries
 * locally if available and up to date, from a remote server, or from a mock
 * (if testing).
 */
export const REQUEST_STORY_SUMMARIES = 'REQUEST_STORY_SUMMARIES';
export const RECEIVE_STORY_SUMMARIES = 'RECEIVE_STORY_SUMMARIES';

export const requestStorySummaries = createAction(REQUEST_STORY_SUMMARIES);
export const receiveStorySummaries = createAction(RECEIVE_STORY_SUMMARIES);

export const fetchStorySummaries = () => {
  return dispatch => {
    console.log('dispatching REQUEST_STORY_SUMMARIES');
    dispatch(requestStorySummaries());
    return getStorySummaries()
      .then(response => response.json())
      .then(summaries => {
        dispatch(receiveStorySummaries(summaries));
      })
      .catch(problem => {
        dispatch(receiveStorySummaries(new Error(problem)))
      })
  }
};

export const REQUEST_STORY_SUMMARY = 'REQUEST_STORY_SUMMARY';
export const RECEIVE_STORY_SUMMARY = 'RECEIVE_STORY_SUMMARY';

export const requestStorySummary = createAction(REQUEST_STORY_SUMMARY);
export const receiveStorySummary = createAction(RECEIVE_STORY_SUMMARY);

export const fetchStorySummary = (storyKey, version) => {
  return dispatch => {
    dispatch(requestStorySummary());
    return getStorySummary(storyKey, version)
      .then(response => response.json())
      .then(summary => {
        dispatch(receiveStorySummary(summary, version));
      })
      .catch(problem => {
        dispatch(receiveStorySummary(new Error(problem)))
      });
  };
};

export const REQUEST_CHAPTER = 'REQUEST_CHAPTER';
export const RECEIVE_CHAPTER = 'RECEIVE_CHAPTER';

export const requestChapter = createAction(REQUEST_CHAPTER,
  (storyKey, chapterId) => ({ storyKey, chapterId }));
export const receiveChapter = createAction(RECEIVE_CHAPTER,
  (storyKey, chapter) => ({ storyKey, chapter }));

export const fetchChapter = (storyKey, version, chapterId) => {
  return dispatch => {
    dispatch(requestChapter(storyKey, version, chapterId));
    return getChapter(storyKey, version, chapterId)
      .then(response => response.json())
      .then(chapter => {
        dispatch(receiveChapter(storyKey, version, chapter));
      })
      .catch(problem => {
        dispatch(receiveChapter(new Error(problem)))
      });
  };
};

export const SHOW_STORY = 'SHOW_STORY';
export const SHOW_CHAPTER = 'SHOW_CHAPTER';

export const showStory = createAction(SHOW_STORY);
export const showChapter = createAction(SHOW_CHAPTER);

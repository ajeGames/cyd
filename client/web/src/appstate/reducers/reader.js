import {
  SHOW_STORY, /* FAIL_SHOW_STORY,*/ SHOW_CHAPTER/*, FAIL_SHOW_CHAPTER */
} from '../actions';

const reader = (state = {}, action) => {
  switch (action.type) {
    case SHOW_STORY:
      return Object.assign({}, state, {
        activeStory: action.payload.storyKey
      });
    case SHOW_CHAPTER:
      return Object.assign({}, state, {
        activeChapter: action.payload.chapterId
      });
    default:
      return state;
  }
}

export default reader;

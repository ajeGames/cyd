import { REQUEST_STORY_SUMMARIES, RECEIVE_STORY_SUMMARIES } from '../actions';

const initialState = {
  fetchingSummaries: false,
  storySummariesToShow: []
};

const library = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_STORY_SUMMARIES:
      return {
        ...state,
        fetchingSummaries: true
      };
    case RECEIVE_STORY_SUMMARIES:
      if (action.error) {
        return {
          ...state,
          fetchingSummaries: false
        }
      }
      const summaryKeys = action.payload.map(summary => {
        return summary.key;  // FIXME change service API to use storyKey instead of key
      });
      return {
        ...state,
        fetchingSummaries: false,
        storySummariesToShow: summaryKeys
      };
    default:
      return state;
  }
};

export default library;

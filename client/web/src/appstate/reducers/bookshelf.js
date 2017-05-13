import * as actions from '../actions';

const summary = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_STORY_SUMMARY:
      const story = action.payload;
      return {
        storyKey: story.key,
        title: story.title,
        author: story.author,
        tagLine: story.tagLine,
        about: story.about,
        firstChapter: story.firstChapter
      };
    default:
      return state;
  }
}

const chapter = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_CHAPTER:
      const chapter = action.payload.chapter;
      const mySignpost = (chapter.signpost)
        ? chapter.signpost.map(sign => {
          return {
            destination: sign.destination,
            teaser: sign.teaser
          }
        })
        : [];
      return {
        id: chapter.id,
        title: chapter.title,
        prose: chapter.prose,
        signpost: mySignpost
      };
    default:
      return state;
  }
}

const story = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_STORY_SUMMARY:
      return {
        ...state,
        summary: summary(state.summary, action)
      };
    case actions.RECEIVE_CHAPTER:
      const chapterId = action.payload.chapter.id;
      const currentChapter = (state.chapters) ? state.chapters[chapterId] : undefined;
      return {
        summary: (state.summary || {}),
        chapters: {
          ...state.chapters,
          [chapterId]: chapter(currentChapter, action)
        }
      };
    default:
      return state;
  }
}

export const bookshelf = (state = {}, action) => {
  switch (action.type) {
    case actions.RECEIVE_STORY_SUMMARY:
    case actions.RECEIVE_CHAPTER:
      const storyKey = action.payload.key;  // FIXME change service API to use storyKey instead of key
      return {
        ...state,
        [storyKey]: story(state[storyKey], action)
      };
    case actions.RECEIVE_STORY_SUMMARIES:
      let newState = Object.assign({}, state);
      action.payload.map(summary => {
        const storyKey = summary.key;  // FIXME change service API to use storyKey instead of key
        newState[storyKey] = story(undefined, actions.receiveStorySummary(summary));
        return newState[storyKey];
      });
      return newState;
    default:
      return state;
  }
}

export default bookshelf;

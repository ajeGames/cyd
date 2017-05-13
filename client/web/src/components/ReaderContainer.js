import { connect } from 'react-redux';
// import { storyThatStartsAtTheEnd as myStory } from '../apidata';
import { shortStory as myStory } from '../apidata';
// import { fetchStorySummaries, failFetchStorySummaries, loadStorySummaries } from '../appstate/actions';
import { showChapter } from '../appstate/actions';
import Reader from './Reader';

const mapStateToProps = (state) => {
  const chapterId = state.reader.activeChapter || myStory.summary.firstChapter;
  return {
    story: myStory.summary,
    chapter: myStory.chapters[chapterId]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchToChapter: (chapterId) => {
      dispatch(showChapter(chapterId));
    }
  }
}

const ReaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Reader);

export default ReaderContainer;

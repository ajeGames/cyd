import { combineReducers } from 'redux';
import library from './library';
import bookshelf from './bookshelf';
import reader from './reader'

const storyTimeApp = combineReducers({
  bookshelf,
  library,
  reader
});

export default storyTimeApp;

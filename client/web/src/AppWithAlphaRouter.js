import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import storyTimeApp from './appstate/reducers';
import LibraryContainer from './components/LibraryContainer';
import ReaderContainer from './components/Reader';
import NumberGuessing from './components/NumberGuessing';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(
  combineReducers({
    ...storyTimeApp,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => (
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <div>
        <h3>StoryTime</h3>
        <p><Link to="/">StoryTime</Link> | <Link to="/guess">Number Guessing Game</Link></p>
        <Route exact path="/" component={ LibraryContainer } />
        <Route path="/reader" component={ ReaderContainer } />
        <Route path="/guess" component={ NumberGuessing } />
      </div>
    </ConnectedRouter>
  </Provider>
)

export default App;

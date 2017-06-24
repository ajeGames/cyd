import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import storyTimeApp from './appstate/reducers';
import HomePage from './components/HomePage';
import LibraryContainer from './components/LibraryContainer';
import ReaderContainer from './components/ReaderContainer';
import NumberGuessing from './components/NumberGuessing';

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(storyTimeApp,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
);

const App = () => (
  <Provider store={ store }>
    <Router>
      <div>
        <h3>StoryTime</h3>
        <p><Link to="/">StoryTime</Link> | <Link to="/guess">Number Guessing Game</Link></p>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/library" component={ LibraryContainer } />
        <Route path="/reader" component={ ReaderContainer } />
        <Route path="/guess" component={ NumberGuessing } />
      </div>
    </Router>
  </Provider>
)

export default App;

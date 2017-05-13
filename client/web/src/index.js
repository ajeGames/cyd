import 'babel-polyfill';  // here because of isomorphic-fetch used to interact with remote services
import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

render(
  <App />,
  document.getElementById('root')
);

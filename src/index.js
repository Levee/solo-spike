import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import Axios from 'axios';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import './index.css';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

function* rootSaga() {
  yield takeEvery('FETCH_ALL_GAMES', fetchAllGames);
  yield takeEvery('FETCH_SEARCH_RESULTS', fetchSearchResults);
  yield takeEvery('FETCH_NEWS', fetchNews);
}

//////////  SAGAS  //////////

function* fetchAllGames() {
  try {
    const response = yield Axios.get('/api/steam');
    yield put({ type: 'SET_GAMES', payload: response.data.applist.apps });
  } catch (error) {
    alert('Unable to retrieve games from server.');
  }
}

function* fetchSearchResults(action) {
  try {
    yield put({ type: 'SET_SEARCH_RESULTS', payload: action.payload });
  } catch (error) {
    alert('Unable to retrieve search results.');
  }
}

function* fetchNews(action) {
  try {
    const response = yield Axios.get(`/api/steam/${action.payload.id}/${action.payload.count}`);
    yield put({ type: 'SET_NEWS', payload: response.data.appnews });
  } catch (error) {
    alert('Unable to retrieve news from server.');
  }
}

//////////  REDUCERS  //////////

const games = (state = [], action) => {
  switch (action.type) {
    case 'SET_GAMES':
      return [...action.payload];
    default:
      return state;
  }
}

const search = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return [...action.payload];
    default:
      return state;
  }
}

const news = (state = null, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return action.payload;
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const storeInstance = createStore(
  combineReducers({
    games,
    search,
    news,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

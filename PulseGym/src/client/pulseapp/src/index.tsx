import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import ReactDOM from 'react-dom/client';
import { rootReducer } from './components/redux/rootReducer';
import App from './App';
import { sagaWatcher } from './components/redux/saga/saga';

const saga = createSagaMiddleware();
// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(sagaWatcher);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

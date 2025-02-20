import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { formReducer } from './reducer/formreducer.ts';
import {thunk} from 'redux-thunk'; 

// Combining the enhancers (browser extension and middleware combination) 0_0
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  formReducer,
  composeEnhancers(applyMiddleware(thunk)) 
);

export default store;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore() {
    const middleware = [thunk];
    let store = null;

    if (typeof window === 'undefined') {
        store = createStore(
            rootReducer,
            applyMiddleware(...middleware)
        );
    } else {
        const initialState = window.__INITIAL_STATE__;
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(...middleware)
        );
    }

    return store;
}

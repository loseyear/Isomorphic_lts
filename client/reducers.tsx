import { combineReducers } from 'redux';

import { imageList } from './components/actions';

const rootReducer = combineReducers({
    imageList,
});

export default rootReducer;

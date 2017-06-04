import { combineReducers } from 'redux';

import place from './placeReducer';
import user from './userReducer';

export default combineReducers({
  place,
  user,
});

import {combineReducers} from 'redux'
import tokenReducer from '../token/tokenReducer'

export default combineReducers({
  token: tokenReducer
});

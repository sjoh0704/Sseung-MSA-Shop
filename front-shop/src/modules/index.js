import {combineReducers} from 'redux'
import user from './user'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({
    user,

})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import listSlice from './slices/projects/listSlice';
import popularSlice from './slices/projects/popularSlice';
import recentSlice from './slices/projects/recentSlice';

const rootReducer = combineReducers({
  user: loginSlice.reducer,
  recent: recentSlice.reducer,
  popular: popularSlice.reducer,
  list: listSlice.reducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

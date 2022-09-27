import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginSlice from './slices/loginSlice';
import projectsSlice from './slices/projectsSlice';

const rootReducer = combineReducers({
  user: loginSlice.reducer,
  projects: projectsSlice.reducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

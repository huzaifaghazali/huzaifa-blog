import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';

// Combine all the reducers into a single root reducer
const rootReducer = combineReducers({
  // reducer that handles all the user-related state and theme state
  user: userReducer,
  theme: themeReducer,
});

// Configuration for redux-persist
const persistConfig = {
  // The key under which the persisted state will be stored in the storage
  key: 'root',
  // The storage engine used to persist the state
  storage,
  // The version of the persisted state
  version: 1,
};

// Create a reducer that will persist the state
const persistReducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // Set the root reducer that will handle all the state
  reducer: persistReducers,
  // Configure the middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Disable the serializableCheck middleware for now
      // This middleware checks if the actions are serializable (can be safely converted to JSON)
      // Since we're using a custom middleware for handling Firebase actions, we can disable this check
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { usersApi } from './services/userServices';
import { todoApi } from './services/todoServices';
import authReducer from './features/authSlice';
export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApi.middleware, todoApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export default store;

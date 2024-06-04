import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/AuthSlice';
import usersReducer from './slices/UsersSlice';
import servicesReducer from './slices/ServicesSlice';
import reviewsReducer from './slices/ReviewsSlice';
import bookingsReducer from './slices/BookingsSlice';
import analyticsReducer from './slices/AnalyticsSlice';
import notificationReducer from './slices/NotificationSlice';
const authPersistConfig = {
  key: 'auth',
  storage,
};

const usersPersistConfig = {
  key: 'users',
  storage,
};

const servicesPersistConfig = {
  key: 'services',
  storage,
};

const reviewsPersistConfig = {
  key: 'reviews',
  storage,
};

const bookingsPersistConfig = {
  key: 'bookings',
  storage,
};

const analyticsPersistConfig = {
  key: 'analytics',
  storage,
};

const notificationPersistConfig = {
  key: 'notifications',
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedUsersReducer = persistReducer(usersPersistConfig, usersReducer);
const persistedServicesReducer = persistReducer(servicesPersistConfig, servicesReducer);
const persistedReviewsReducer = persistReducer(reviewsPersistConfig, reviewsReducer);
const persistedBookingsReducer = persistReducer(bookingsPersistConfig, bookingsReducer);
const persistedAnalyticsReducer = persistReducer(analyticsPersistConfig, analyticsReducer);
const persistedNotificationReducer = persistReducer(notificationPersistConfig, notificationReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    users: persistedUsersReducer,
    services: persistedServicesReducer,
    reviews: persistedReviewsReducer,
    bookings: persistedBookingsReducer,
    analytics: persistedAnalyticsReducer,
    notifications: persistedNotificationReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, auths: authsState}
export type AppDispatch = typeof store.dispatch;

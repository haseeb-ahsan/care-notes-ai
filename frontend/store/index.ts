import { configureStore } from '@reduxjs/toolkit';
import residentsReducer from './residentsSlice';
import notesReducer from './notesSlice';

export const store = configureStore({
  reducer: {
    residents: residentsReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

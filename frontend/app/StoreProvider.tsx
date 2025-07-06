'use client';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { loadResidents } from '../store/residentsSlice';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch<any>(loadResidents());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}

'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchResidents } from '../store/residentsSlice';

export function ResidentsList({
  onSelect,
}: {
  onSelect: (id: number) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: residents,
    loading,
    error,
  } = useSelector((state: RootState) => state.residents);

  useEffect(() => {
    dispatch(fetchResidents());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Residents</h2>
      {loading && <p className='text-gray-500'>Loading…</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}
      <ul className='space-y-2'>
        {residents.map((res) => (
          <li
            key={res.id}
            className='p-2 bg-white rounded shadow hover:bg-blue-50 cursor-pointer'
            onClick={() => onSelect(res.id)}
          >
            {res.first_name} {res.last_name} (Room {res.room})
          </li>
        ))}
      </ul>
    </div>
  );
}

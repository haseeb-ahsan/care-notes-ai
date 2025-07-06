'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loadResidents } from '../store/residentsSlice';

export function ResidentsList({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const residents = useSelector((state: RootState) => state.residents.list);

  useEffect(() => {
    dispatch(loadResidents());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Residents</h2>
      <ul className='space-y-2'>
        {residents.map((res) => (
          <li
            key={res.id}
            className='p-2 bg-white rounded shadow hover:bg-blue-50 cursor-pointer'
            onClick={() => onSelect(res.id)}
          >
            {res.firstName} {res.lastName} (Room {res.room})
          </li>
        ))}
      </ul>
    </div>
  );
}

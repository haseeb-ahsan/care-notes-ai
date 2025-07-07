'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import {
  fetchResidents,
  deleteResidentApi,
  Resident,
} from '../store/residentsSlice';
import { Edit2, Trash2 } from 'lucide-react';

export function ResidentsList({
  onSelect,
  onEdit,
}: {
  onSelect: (id: number) => void;
  onEdit: (res: Resident) => void;
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
            className='flex justify-between items-center p-2 bg-white rounded shadow hover:bg-blue-50'
          >
            <span className='cursor-pointer' onClick={() => onSelect(res.id)}>
              {res.first_name} {res.last_name} (Room {res.room})
            </span>
            <div className='flex space-x-2'>
              <button onClick={() => onEdit(res)}>
                <Edit2 size={16} />
              </button>
              <button onClick={() => dispatch(deleteResidentApi(res.id))}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

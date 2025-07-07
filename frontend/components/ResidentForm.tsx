'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addResidentApi,
  updateResidentApi,
  fetchResidents,
  Resident,
} from '../store/residentsSlice';
import { AppDispatch } from '../store';

interface ResidentFormProps {
  existingResident?: Resident;
  onCancel?: () => void;
  onComplete?: () => void;
}

export function ResidentForm({
  existingResident,
  onCancel,
  onComplete,
}: ResidentFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [first_name, setFirstName] = useState(
    existingResident?.first_name || ''
  );
  const [last_name, setLastName] = useState(existingResident?.last_name || '');
  const [room, setRoom] = useState(existingResident?.room || '');

  useEffect(() => {
    if (existingResident) {
      setFirstName(existingResident.first_name);
      setLastName(existingResident.last_name);
      setRoom(existingResident.room);
    }
  }, [existingResident]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (existingResident) {
      await dispatch(
        updateResidentApi({
          id: existingResident.id,
          first_name,
          last_name,
          room,
        })
      ).unwrap();
    } else {
      await dispatch(addResidentApi({ first_name, last_name, room })).unwrap();
    }
    dispatch(fetchResidents());
    if (onComplete) onComplete();
    if (onCancel) onCancel();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-xl font-semibold'>
        {existingResident ? 'Edit Resident' : 'Add Resident'}
      </h2>

      <input
        className='w-full p-2 border rounded'
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder='First Name'
        required
      />
      <input
        className='w-full p-2 border rounded'
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
        placeholder='Last Name'
        required
      />
      <input
        className='w-full p-2 border rounded'
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        placeholder='Room'
        required
      />

      <div className='flex justify-between'>
        <button
          type='submit'
          className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
        >
          Save
        </button>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400'
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

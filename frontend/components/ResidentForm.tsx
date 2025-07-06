'use client';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { addResidentApi, fetchResidents } from '../store/residentsSlice';

export function ResidentForm() {
  const dispatch = useDispatch<AppDispatch>();
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [room, setRoom] = useState('');
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await dispatch(addResidentApi({ first_name, last_name, room })).unwrap();
    dispatch(fetchResidents());
    setFirstName('');
    setLastName('');
    setRoom('');
  }
  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-xl font-semibold'>Add Resident</h2>
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
      <button
        type='submit'
        className='px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
      >
        Save Resident
      </button>
    </form>
  );
}

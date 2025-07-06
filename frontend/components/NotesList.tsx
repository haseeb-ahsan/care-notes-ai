'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchNotes } from '../store/notesSlice';

export function NotesList({
  residentId,
  onEdit,
}: {
  residentId: number;
  onEdit: (noteId: number) => void;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    list: notes,
    loading,
    error,
  } = useSelector((state: RootState) => state.notes);

  useEffect(() => {
    if (residentId) {
      dispatch(fetchNotes(residentId));
    }
  }, [residentId, dispatch]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Notes</h2>
      {loading && <p className='text-gray-500'>Loading notes…</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}
      <ul className='space-y-4'>
        {notes.map((note) => (
          <li key={note.id} className='p-4 bg-white rounded shadow'>
            <p className='italic text-gray-600'>
              {note.summary || 'No summary yet'}
            </p>
            <p className='mt-2'>{note.content}</p>
            <div className='mt-2 space-x-2'>
              {note.tags?.map((tag) => (
                <span
                  key={tag}
                  className='px-2 py-1 bg-blue-100 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              className='mt-2 text-blue-600 hover:underline'
              onClick={() => onEdit(note.id)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

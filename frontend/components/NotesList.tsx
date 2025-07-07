'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchNotes, deleteNoteApi } from '../store/notesSlice';
import { Trash2, Edit2 } from 'lucide-react';

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
    if (residentId) dispatch(fetchNotes(residentId));
  }, [residentId, dispatch]);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>Notes</h2>
      {loading && <p className='text-gray-500'>Loading notes…</p>}
      {error && <p className='text-red-500'>Error: {error}</p>}
      <ul className='space-y-4'>
        {notes.map((note) => (
          <li
            key={note.id}
            className='flex justify-between items-start p-4 bg-white rounded shadow'
          >
            <div>
              {/* AI Summary */}
              <p className='font-semibold'>Summary: {note.summary}</p>
              {/* AI Tags */}
              <p className='italic text-gray-600'>
                Tags: {note.tags?.join(', ')}
              </p>
              {/* Original content */}
              <p className='mt-2'>{note.content}</p>
              <p className='text-sm text-gray-400'>
                {note.author ? `By ${note.author}` : 'Unknown'} |{' '}
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <button onClick={() => onEdit(note.id)}>
                <Edit2 size={16} />
              </button>
              <button onClick={() => dispatch(deleteNoteApi(note.id))}>
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

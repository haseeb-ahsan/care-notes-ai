'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { saveNote } from '../store/notesSlice';
import { v4 as uuidv4 } from 'uuid';

interface NoteFormProps {
  residentId: string;
  existingNote?: { id: string; content: string };
  onSaved: () => void;
}

export function NoteForm({ residentId, existingNote, onSaved }: NoteFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState(existingNote?.content || '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const note = {
      id: existingNote?.id || uuidv4(),
      residentId,
      content,
      summary: undefined,
      tags: undefined,
    };
    dispatch(saveNote(note));
    onSaved();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4 bg-white rounded shadow space-y-4'
    >
      <h2 className='text-2xl font-bold'>
        {existingNote ? 'Edit' : 'Add'} Note
      </h2>
      <textarea
        className='w-full h-32 p-2 border rounded'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Write your care note here...'
      />
      <button
        type='submit'
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Save Note
      </button>
    </form>
  );
}

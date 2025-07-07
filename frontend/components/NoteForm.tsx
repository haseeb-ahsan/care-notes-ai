'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import {
  addNoteApi,
  fetchNotes,
  updateNoteApi,
  Note,
} from '../store/notesSlice';

interface NoteFormProps {
  residentId: number;
  existingNote?: Note; // full Note, including summary & tags
  onSaved: () => void;
}

export function NoteForm({ residentId, existingNote, onSaved }: NoteFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState(existingNote?.content || '');
  const [saving, setSaving] = useState(false);

  // content in sync if editing a different note
  useEffect(() => {
    setContent(existingNote?.content || '');
  }, [existingNote]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    if (existingNote) {
      // old summary & tags so they arent wiped out
      await dispatch(
        updateNoteApi({
          id: existingNote.id,
          resident_id: residentId,
          content,
          summary: existingNote.summary,
          tags: existingNote.tags,
        })
      ).unwrap();
    } else {
      await dispatch(addNoteApi({ resident_id: residentId, content })).unwrap();
    }

    // refresh and close
    await dispatch(fetchNotes(residentId));
    setSaving(false);
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
        required
      />

      <button
        type='submit'
        disabled={saving}
        className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
      >
        {saving ? 'Saving…' : 'Save Note & AI Summarize'}
      </button>
    </form>
  );
}

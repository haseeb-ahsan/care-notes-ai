'use client';

import React, { useState } from 'react';
import { ResidentsList } from '../components/ResidentsList';
import { NotesList } from '../components/NotesList';
import { NoteForm } from '../components/NoteForm';
import { ResidentForm } from '../components/ResidentForm';

export default function HomePage() {
  const [selectedResident, setSelectedResident] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  function handleSaved() {
    setShowForm(false);
    setEditingNote(null);
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar: Add Resident & Residents List */}
      <aside className='w-1/3 border-r bg-white overflow-auto p-4 space-y-4'>
        <ResidentForm />
        <ResidentsList onSelect={setSelectedResident} />
      </aside>

      {/* Main Content: Notes and NoteForm */}
      <main className='w-2/3 p-6 overflow-auto'>
        {selectedResident !== null ? (
          showForm || editingNote !== null ? (
            <NoteForm
              residentId={selectedResident}
              existingNote={
                editingNote !== null
                  ? { id: editingNote, content: '' } // you may fetch content separately
                  : undefined
              }
              onSaved={handleSaved}
            />
          ) : (
            <>
              <button
                className='mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition'
                onClick={() => setShowForm(true)}
              >
                + Add Note
              </button>

              <NotesList
                residentId={selectedResident}
                onEdit={(id) => {
                  setEditingNote(id);
                  setShowForm(true);
                }}
              />
            </>
          )
        ) : (
          <p className='p-4 text-gray-600'>Select a resident to view notes.</p>
        )}
      </main>
    </div>
  );
}

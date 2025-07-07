'use client';

import React, { useState } from 'react';
import { ResidentsList } from '../components/ResidentsList';
import { NotesList } from '../components/NotesList';
import { NoteForm } from '../components/NoteForm';
import { ResidentForm } from '../components/ResidentForm';
import { Resident } from '../store/residentsSlice';

export default function HomePage() {
  const [selectedResident, setSelectedResident] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [showResidentForm, setShowResidentForm] = useState(false);

  function handleNoteSaved() {
    setShowNoteForm(false);
    setEditingNote(null);
  }

  function handleResidentComplete() {
    setShowResidentForm(false);
    setEditingResident(null);
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar */}
      <aside className='w-1/3 border-r bg-white overflow-auto p-4 space-y-4'>
        {!showResidentForm && (
          <button
            className='w-full mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700'
            onClick={() => {
              setEditingResident(null);
              setShowResidentForm(true);
            }}
          >
            + Add Resident
          </button>
        )}

        {showResidentForm && (
          <ResidentForm
            existingResident={editingResident || undefined}
            onCancel={() => setShowResidentForm(false)}
            onComplete={handleResidentComplete}
          />
        )}

        <ResidentsList
          onSelect={setSelectedResident}
          onEdit={(res) => {
            setEditingResident(res);
            setShowResidentForm(true);
          }}
        />
      </aside>

      {/* Main Content: Notes */}
      <main className='w-2/3 p-6 overflow-auto'>
        {selectedResident !== null ? (
          showNoteForm || editingNote !== null ? (
            <NoteForm
              residentId={selectedResident}
              existingNote={
                editingNote !== null
                  ? { id: editingNote, content: '' } // you can fetch full note if needed
                  : undefined
              }
              onSaved={handleNoteSaved}
            />
          ) : (
            <>
              <button
                className='mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700'
                onClick={() => setShowNoteForm(true)}
              >
                + Add Note
              </button>

              <NotesList
                residentId={selectedResident}
                onEdit={(id) => {
                  setEditingNote(id);
                  setShowNoteForm(true);
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

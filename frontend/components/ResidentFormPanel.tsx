'use client';

import React, { useState } from 'react';
import { ResidentForm } from './ResidentForm';
import { Resident } from '../store/residentsSlice';

export function ResidentFormPanel() {
  const [showForm, setShowForm] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);

  return (
    <div className='w-full'>
      {!showForm ? (
        <button
          onClick={() => {
            setEditingResident(null);
            setShowForm(true);
          }}
          className='w-full mb-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700 transition'
        >
          + Add Resident
        </button>
      ) : (
        <div className='animate-[fadeInDown_0.3s_ease-out]'>
          <ResidentForm
            existingResident={editingResident || undefined}
            onCancel={() => setShowForm(false)}
            onComplete={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
}

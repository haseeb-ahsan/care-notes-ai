// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import { ResidentsList } from '../components/ResidentsList';
// import { NotesList } from '../components/NotesList';
// import { NoteForm } from '../components/NoteForm';

// export default function HomePage() {
//   const [selectedResident, setSelectedResident] = useState<string>('');
//   const [editingNote, setEditingNote] = useState<string | null>(null);
//   const [showForm, setShowForm] = useState<boolean>(false);

//   function handleSaved() {
//     setShowForm(false);
//     setEditingNote(null);
//   }

//   return (
//     <div className='flex'>
//       <div className='w-1/3 border-r'>
//         <ResidentsList onSelect={setSelectedResident} />
//       </div>
//       <div className='w-2/3 p-4'>
//         {selectedResident ? (
//           showForm || editingNote ? (
//             <NoteForm
//               residentId={selectedResident}
//               existingNote={editingNote ? undefined : undefined}
//               onSaved={handleSaved}
//             />
//           ) : (
//             <>
//               <button
//                 className='mb-4 px-4 py-2 bg-green-600 text-white rounded'
//                 onClick={() => setShowForm(true)}
//               >
//                 + Add Note
//               </button>
//               <NotesList
//                 residentId={selectedResident}
//                 onEdit={(id) => {
//                   setEditingNote(id);
//                   setShowForm(true);
//                 }}
//               />
//             </>
//           )
//         ) : (
//           <p className='p-4'>Select a resident to view notes.</p>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import { ResidentsList } from '../components/ResidentsList';
import { NotesList } from '../components/NotesList';
import { NoteForm } from '../components/NoteForm';

export default function HomePage() {
  const [selectedResident, setSelectedResident] = useState<string>('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  // Called after saving a note
  function handleSaved() {
    setShowForm(false);
    setEditingNote(null);
  }

  return (
    <div className='flex h-screen bg-gray-50'>
      {/* Sidebar: Residents */}
      <aside className='w-1/3 border-r bg-white overflow-auto'>
        <ResidentsList onSelect={setSelectedResident} />
      </aside>

      {/* Main Content: Notes and Form */}
      <main className='w-2/3 p-6 overflow-auto'>
        {selectedResident ? (
          showForm || editingNote ? (
            <NoteForm
              residentId={selectedResident}
              existingNote={
                editingNote
                  ? // you could pass the existing note data here if you fetch it
                    undefined
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

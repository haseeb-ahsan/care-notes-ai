import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PouchDB from 'pouchdb-browser';

const notesDB = new PouchDB('notes');

type Note = {
  id: string;
  residentId: string;
  content: string;
  summary?: string;
  tags?: string[];
};

interface NotesState {
  list: Note[];
}
const initialState: NotesState = { list: [] };

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes(state, action: PayloadAction<Note[]>) {
      state.list = action.payload;
    },
    addNote(state, action: PayloadAction<Note>) {
      state.list.push(action.payload);
    },
  },
});

export const { setNotes, addNote } = notesSlice.actions;
export default notesSlice.reducer;

export const loadNotes = (residentId: string) => async (dispatch: any) => {
  const all = await notesDB.find({ selector: { residentId } });
  const notes = all.docs as Note[];
  dispatch(setNotes(notes));
};

export const saveNote = (note: Note) => async (dispatch: any) => {
  const response = await notesDB.put({ ...note, _id: note.id });
  dispatch(addNote(note));
};

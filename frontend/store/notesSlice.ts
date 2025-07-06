// frontend/store/notesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Note = {
  id: number;
  resident_id: number;
  content: string;
  summary?: string;
  tags?: string[];
};

interface NotesState {
  list: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  list: [],
  loading: false,
  error: null,
};

// Thunk to load notes for one resident
export const fetchNotes = createAsyncThunk(
  'notes/fetch',
  async (residentId: number) => {
    const response = await axios.get<Note[]>(
      `http://127.0.0.1:8000/notes/${residentId}`
    );
    return response.data;
  }
);

// Thunk to add a note via API
export const addNoteApi = createAsyncThunk(
  'notes/add',
  async (note: Omit<Note, 'id'>) => {
    const response = await axios.post<Note>(
      'http://127.0.0.1:8000/notes',
      note
    );
    return response.data;
  }
);

// Thunk to update a note via API
export const updateNoteApi = createAsyncThunk(
  'notes/update',
  async (note: Note) => {
    const response = await axios.put<Note>(
      `http://127.0.0.1:8000/notes/${note.id}`,
      note
    );
    return response.data;
  }
);

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load';
        state.loading = false;
      })
      .addCase(addNoteApi.fulfilled, (state, action: PayloadAction<Note>) => {
        state.list.push(action.payload);
      })
      .addCase(
        updateNoteApi.fulfilled,
        (state, action: PayloadAction<Note>) => {
          const idx = state.list.findIndex((n) => n.id === action.payload.id);
          if (idx !== -1) state.list[idx] = action.payload;
        }
      );
  },
});

export default notesSlice.reducer;

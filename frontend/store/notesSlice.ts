// frontend/store/notesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export type Note = {
  id: number;
  resident_id: number;
  content: string;
  summary?: string;
  tags?: string[];
  created_at?: string;
  author?: string;
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
    const response = await axios.get<Note[]>(`${BASE_URL}/notes/${residentId}`);
    return response.data;
  }
);

// Thunk to add a note via API
export const addNoteApi = createAsyncThunk(
  'notes/add',
  async (note: Omit<Note, 'id' | 'created_at'>) => {
    const response = await axios.post<Note>(`${BASE_URL}/notes`, note);
    return response.data;
  }
);

// Thunk to update a note via API
export const updateNoteApi = createAsyncThunk(
  'notes/update',
  async (note: Note) => {
    const response = await axios.put<Note>(
      `${BASE_URL}/notes/${note.id}`,
      note
    );
    return response.data;
  }
);
// delete note
export const deleteNoteApi = createAsyncThunk(
  'notes/delete',
  async (id: number) => {
    await axios.delete(`${BASE_URL}/notes/${id}`);
    return id;
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
      )
      .addCase(
        deleteNoteApi.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.list = state.list.filter((n) => n.id !== action.payload);
        }
      );
  },
});

export default notesSlice.reducer;

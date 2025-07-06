import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export type Resident = {
  id: number;
  first_name: string;
  last_name: string;
  room: string;
};
interface ResidentsState {
  list: Resident[];
  loading: boolean;
  error: string | null;
}
const initialState: ResidentsState = { list: [], loading: false, error: null };

// load residents
export const fetchResidents = createAsyncThunk('residents/fetch', async () => {
  const response = await axios.get<Resident[]>(
    'http://127.0.0.1:8000/residents'
  );
  return response.data;
});

// add api
export const addResidentApi = createAsyncThunk(
  'residents/add',
  async (newRes: Omit<Resident, 'id'>) => {
    const response = await axios.post<Resident>(
      'http://127.0.0.1:8000/residents',
      newRes
    );
    return response.data;
  }
);

export const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResidents.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchResidents.fulfilled,
        (state, action: PayloadAction<Resident[]>) => {
          state.list = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchResidents.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load';
        state.loading = false;
      })
      .addCase(
        addResidentApi.fulfilled,
        (state, action: PayloadAction<Resident>) => {
          state.list.push(action.payload);
        }
      );
  },
});

export default residentsSlice.reducer;

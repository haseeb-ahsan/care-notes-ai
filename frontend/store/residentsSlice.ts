import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PouchDB from 'pouchdb-browser';
import PouchDBFind from 'pouchdb-find';

PouchDB.plugin(PouchDBFind);

const residentsDB = new PouchDB('residents');

type Resident = {
  id: string;
  firstName: string;
  lastName: string;
  room: string;
};

interface ResidentsState {
  list: Resident[];
}
const initialState: ResidentsState = { list: [] };

export const residentsSlice = createSlice({
  name: 'residents',
  initialState,
  reducers: {
    setResidents(state, action: PayloadAction<Resident[]>) {
      state.list = action.payload;
    },
    addResident(state, action: PayloadAction<Resident>) {
      state.list.push(action.payload);
    },
  },
});

export const { setResidents, addResident } = residentsSlice.actions;
export default residentsSlice.reducer;

export const loadResidents = () => async (dispatch: any) => {
  const all = await residentsDB.allDocs({ include_docs: true });
  const residents = all.rows.map((row) => row.doc) as Resident[];
  dispatch(setResidents(residents));
};

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MostOptionType } from '../types/mostInfo';

interface MostReduxState {
  MostOption: MostOptionType;
}

const initialState: MostReduxState = {
  MostOption: '챔피언 승률',
};

const MostSlice = createSlice({
  name: 'most',
  initialState,
  reducers: {
    selectMostOption(state, action: PayloadAction<MostOptionType>) {
      state.MostOption = action.payload;
    },
  },
});

const { actions, reducer } = MostSlice;
export const { selectMostOption } = actions;

export default reducer;

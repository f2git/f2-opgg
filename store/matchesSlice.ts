import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MatchOptionType } from '../types/matches';

interface MatchesReduxState {
  matchOption: MatchOptionType;
}

const initialState: MatchesReduxState = {
  matchOption: '전체',
};

const MatchesSlice = createSlice({
  name: 'mostInfo',
  initialState,
  reducers: {
    selectMatchOption(state, action: PayloadAction<MatchOptionType>) {
      state.matchOption = action.payload;
    },
  },
});

const { actions, reducer } = MatchesSlice;
export const { selectMatchOption } = actions;

export default reducer;

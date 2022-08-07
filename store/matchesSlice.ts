import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSummonerMatchInfo } from '../api/summonerAPI';
import { MatchOptionType, MatchesInfoType } from '../types/matches';

interface MatchesReduxState {
  matchesInfo?: MatchesInfoType;
  matchOption: MatchOptionType;
}

const initialState: MatchesReduxState = {
  matchOption: '전체',
};

export const fetchMatchesInfoByName = createAsyncThunk(
  'matches/fetchByName',
  async (args, { getState, rejectWithValue }) => {
    const state: any = getState();
    const { name } = state.summonerReducer.selected;
    const res = await getSummonerMatchInfo(name);
    return res;
  },
);

const MatchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    selectMatchOption(state, action: PayloadAction<MatchOptionType>) {
      state.matchOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMatchesInfoByName.fulfilled, (state, action) => {
      state.matchesInfo = action.payload;
    });
  },
});

const { actions, reducer } = MatchesSlice;
export const { selectMatchOption } = actions;

export default reducer;

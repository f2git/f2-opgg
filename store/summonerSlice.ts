import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SummonerType } from '../types/summoner';
import { getSummonerBaseInfo } from '../api/summonerAPI';

interface SummonerReduxState {
  selected: SummonerType | null;
}

const initialState: SummonerReduxState = {
  selected: null,
};

export const fetchSummonerBaseInfoByName = createAsyncThunk(
  'summoners/fetchBaseInfoByName',
  async (name: string, { rejectWithValue }) => {
    const res = await getSummonerBaseInfo(name);
    return res.data.summoner;
  },
);

const summonerSlice = createSlice({
  name: 'summoner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSummonerBaseInfoByName.fulfilled, (state, action) => {
      state.selected = action.payload;
    });
  },
});

const { reducer } = summonerSlice;

export default reducer;

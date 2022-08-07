import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SummonerType } from '../types/summoner';
import { getSummonerBaseInfo } from '../api/summonerAPI';

interface SummonerReduxState {
  selected: SummonerType | null;
}

const initialState: SummonerReduxState = {
  selected: null,
};

export const fetchSummonerBaseInfoByName = createAsyncThunk('summoners/fetchBaseInfoByName', async (name: string) => {
  const res = await getSummonerBaseInfo(name);
  return res.data.summoner;
});

const summonerSlice = createSlice({
  name: 'summoner',
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<SummonerType | null>) {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSummonerBaseInfoByName.fulfilled, (state, action) => {
      state.selected = action.payload;
    });
  },
});

const { actions, reducer } = summonerSlice;

export const { setSelected } = actions;

export default reducer;

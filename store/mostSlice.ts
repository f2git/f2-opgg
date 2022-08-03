import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSummonerMostInfo } from '../api/summonerAPI';
import { MostOptionType, MostInfoType } from '../types/mostInfo';

interface MostReduxState {
  mostInfo?: MostInfoType;
  mostOption: MostOptionType;
}

const initialState: MostReduxState = {
  mostOption: '챔피언 승률',
};

export const fetchMostInfoByName = createAsyncThunk(
  'mostInfo/fetchByName',
  async (args, { getState, rejectWithValue }) => {
    const state: any = getState();
    const { name } = state.summonerReducer.selected;
    const res = await getSummonerMostInfo(name);
    return res.data;
  },
);

const MostSlice = createSlice({
  name: 'most',
  initialState,
  reducers: {
    selectMostOption(state, action: PayloadAction<MostOptionType>) {
      state.mostOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMostInfoByName.fulfilled, (state, action) => {
      state.mostInfo = action.payload;
    });
  },
});

const { actions, reducer } = MostSlice;
export const { selectMostOption } = actions;

export default reducer;

import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

import summonerReducer from './summonerSlice';
import mostReducer from './mostSlice';
import matchesReducer from './matchesSlice';

const rootReducer = combineReducers({
  summonerReducer,
  mostReducer,
  matchesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const reducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return rootReducer(state, action);
};

const initStore = () => {
  const store = configureStore({
    reducer,
    devTools: true,
  });
  return store;
};

export const wrapper = createWrapper(initStore);

type AppStore = ReturnType<typeof initStore>;
type AppDispatch = AppStore['dispatch'];
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

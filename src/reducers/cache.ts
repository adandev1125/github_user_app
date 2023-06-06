import {createSlice} from '@reduxjs/toolkit';

interface ProfileCache {
  [username: string]: {
    time: number;
  };
}

export interface CacheState {
  profileCache: ProfileCache;
}

const initialState: CacheState = {
  profileCache: {},
};

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    updateProfileCache(state, action) {
      state.profileCache[action.payload.username] = {
        ...action.payload.data,
        time: Date.now(),
      };
    },
  },
});

export const {updateProfileCache} = cacheSlice.actions;

export default cacheSlice;

import {configureStore} from '@reduxjs/toolkit';

import cacheSlice from '../reducers/cache';

const store = configureStore({
  reducer: {
    cache: cacheSlice.reducer,
  },
});

export default store;

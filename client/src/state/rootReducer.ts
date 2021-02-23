import { combineReducers } from '@reduxjs/toolkit';

import { userSlice } from './userSlice';
import { characterSlice } from './characterSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    character: characterSlice.reducer
})

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
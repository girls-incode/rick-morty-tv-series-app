import {
    configureStore,
} from "@reduxjs/toolkit";
import { userSlice } from './userSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer
        // app: appSlice.reducer,
        // character: characterSlice
    },
});
export type AppDispatch = typeof store.dispatch

export default store;
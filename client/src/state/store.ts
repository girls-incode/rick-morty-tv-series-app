import {
    configureStore,
    getDefaultMiddleware
} from "@reduxjs/toolkit";
import { userSlice } from './userSlice';
import { characterSlice } from './characterSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        character: characterSlice.reducer
        // app: appSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export type AppDispatch = typeof store.dispatch

export default store;
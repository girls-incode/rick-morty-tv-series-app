import {
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'
import { userSlice } from './userSlice';
import { characterSlice } from './characterSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        character: characterSlice.reducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
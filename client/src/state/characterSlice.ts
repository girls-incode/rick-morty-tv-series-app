import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import apiClient from './../utils/apiClient';

const initState = {
    loading: false,
    error: '',
    characters: [],
    info: {}
}

const url = process.env.REACT_APP_CHARACTERS_URL || '';

export const getCharacters = createAsyncThunk(
    'character/getCharacters',
    async () => {
        try {
            const res: any = await apiClient.get(url);
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            return err.message
        }
    }
);

export const characterSlice = createSlice({
    name: 'character',
    initialState: initState,
    reducers: {},
    extraReducers: {
        [getCharacters.fulfilled.type]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                error: '',
                characters: payload.results,
                info: payload.info
            }
        },
        [getCharacters.pending.type]: (state) => {
            state.loading = true;
        },
        [getCharacters.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

// export const { getCharacters } = charactersSlice.actions;

export const characterSelector = (state: RootState) => state.character;
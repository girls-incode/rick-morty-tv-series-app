import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import apiClient from './../utils/apiClient';

const initState = {
    loading: false,
    error: '',
    characters: [],
    character: {},
    info: {}
}

const url = process.env.REACT_APP_CHARACTERS_URL || '';

export const getCharacters = createAsyncThunk(
    'character/getCharacters',
    async (_, { rejectWithValue }) => {
        try {
            const res: any = await apiClient.get(url);
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || err)
        }
    }
);

export const getCharacter = createAsyncThunk(
    'character/getCharacter',
    async (id: number) => {
        try {
            const res: any = await apiClient.get(url + '/' + id);
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
        [getCharacter.fulfilled.type]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                error: '',
                character: payload
            }
        },
        [getCharacter.pending.type]: (state) => {
            state.loading = true;
        },
        [getCharacter.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
    },
});

export const characterSelector = (state: RootState) => state.character;
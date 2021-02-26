import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import apiClient, { setAuthToken, apiOptions } from './../utils/apiClient';
import axiosErrorHandler from './../utils/errors';
interface Character {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: object,
    location: object,
    image: string,
    episode: Array<string>,
    url: string,
    created: string
}

export interface UserState {
    loggedin: boolean,
    name: string,
    email: string,
    loading: boolean,
    error: string | null | undefined,
    favorites: Array<Character>,
    accessToken: string,
    refreshToken: string,
}

const initUserState: UserState = {
    loggedin: false,
    name: '',
    email: '',
    loading: false,
    error: '',
    favorites: [],
    accessToken: '',
    refreshToken: '',
}

const authUrl = process.env.REACT_APP_AUTH_URL;

export const loginUser = createAsyncThunk(
    'users/loginUser',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const res = await apiClient.post(authUrl + '/login', { email, password }, apiOptions);
            if (res.status === 200) {
                setAuthToken(res.data.accessToken);
                localStorage.setItem('atoken', '1');
                return res.data
            }
        }
        catch (err) {
            return rejectWithValue(err?.response?.data?.message || err)
        }
    }
);
export const logoutUser = createAsyncThunk(
    'users/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res: any = await apiClient.post(authUrl + '/logout', apiOptions);
            if (res.status === 200) {
                setAuthToken('');
                localStorage.removeItem('atoken');
                return initUserState
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || err)
        }
    }
);

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ name, email, password }: any, { rejectWithValue }) => {
        try {
            const res: any = await apiClient.post(
                authUrl + '/register',
                { name, email, password },
                apiOptions
            );
            if (res.status === 200) {
                localStorage.setItem('atoken', '1');
                setAuthToken(res.data.accessToken);
                return res.data
            }
        } catch (err) {
            return rejectWithValue(err?.response?.data?.message || err)
        }
    }
);

export const addToFavorites = createAsyncThunk(
    'users/addToFavorites',
    async (data: any) => {
        try {
            const res: any = await apiClient.post(
                authUrl + '/add-favorite',
                data,
                apiOptions
            );
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            return err.message
        }
    }
);
export const removeFromFavorites = createAsyncThunk(
    'users/removeFromFavorites',
    async (data: any) => {
        try {
            const res: any = await apiClient.post(
                authUrl + '/remove-favorite',
                data,
                apiOptions
            );
            if (res.status === 200) {
                return res.data
            }
        } catch (err) {
            return err.message
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        updateUser: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                loggedin: true,
                error: '',
                ...payload
            };
        }
    },
    extraReducers: {
        [registerUser.fulfilled.type]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                loggedin: true,
                error: '',
                ...payload
            }
        },
        [registerUser.pending.type]: (state) => {
            state.loading = true;
            state.loggedin = false;
            state.error = '';
        },
        [registerUser.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [loginUser.fulfilled.type]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                loggedin: true,
                error: '',
                ...payload
            }
        },
        [loginUser.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        [loginUser.pending.type]: (state) => {
            state.loading = true;
            state.loggedin = false;
            state.error = '';
        },
        [logoutUser.fulfilled.type]: (state, { payload }) => {
            return initUserState;
        },
        [logoutUser.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            return state
        },
        [logoutUser.pending.type]: (state) => {
            state.loading = true;
            return state
        },
        [addToFavorites.fulfilled.type]: (state, { payload }) => {
            return {
                ...state,
                loading: false,
                loggedin: true,
                error: '',
                favorites: [...state.favorites, payload]
            }
        },
        [addToFavorites.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            return state
        },
        [addToFavorites.pending.type]: (state) => {
            state.loading = true;
            return state
        },
        [removeFromFavorites.fulfilled.type]: (state, { payload }) => {
            const newList = state.favorites.filter((item: any) => item.id !== payload.id);
            return {
                ...state,
                loading: false,
                loggedin: true,
                error: '',
                favorites: newList
            }
        },
        [removeFromFavorites.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            return state
        },
        [removeFromFavorites.pending.type]: (state) => {
            state.loading = true;
            return state
        },
    },
});

export const { updateUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
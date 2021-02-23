import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';
import axios from 'axios';
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
    error: string,
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

const authUrl = process.env.REACT_APP_AUTH_URL + '/api/v1/users';

const setAuthToken = (token: string) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(authUrl + '/login', { email, password }, { withCredentials: true });
            if (res.status === 200) {
                setAuthToken(res.data.refreshToken);
                return res.data
            }
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ name, email, password }: any, { rejectWithValue }) => {
        try {
            const res: any = await axios.post(
                authUrl + '/register',
                { name, email, password },
                { withCredentials: true }
            );
            if (res.status === 200) {
                setAuthToken(res.data.refreshToken);
                return res.data
            }
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response)
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: initUserState,
    reducers: {
        clearState: (state) => {
            state.loading = false;
            state.error = '';
            return state;
        },
        updateUser: (state, { payload }) => {
            console.log('updateUser', state);
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
            console.log('payload', payload);
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
        },
        [registerUser.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload.message;
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
            console.log('payload', payload);
            state.loading = false;
            state.error = payload.message;
            // return state
        },
        [loginUser.pending.type]: (state) => {
            state.loading = true;
            state.loggedin = false;
            // return state
        },
    },
});

export const { clearState, updateUser } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
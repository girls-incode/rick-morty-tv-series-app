import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

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
    name: string,
    email: string,
    loading: boolean,
    error: string,
    favorites: Array<Character>,
    accessToken: string,
    refreshToken: string,
}

const initUserState: UserState = {
    name: '',
    email: '',
    loading: false,
    error: '',
    favorites: [],
    accessToken: '',
    refreshToken: '',
}

const authUrl = process.env.REACT_APP_AUTH_URL + '/api/v1/users';

export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }: any, thunkAPI) => {
        try {
            const response = await fetch(
                authUrl + '/login',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            console.log('login', data);
            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                return data;
            }
            return thunkAPI.rejectWithValue(data);
        } catch (e) {
            console.log('Error', e.response.data);
            thunkAPI.rejectWithValue(e.response.data);
        }
    }
);

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async ({ name, email, password }: any, thunkAPI) => {
        try {
            const response = await fetch(
                authUrl + '/register',
                {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        password,
                    }),
                }
            );
            let data = await response.json();
            console.log('data', data);

            if (response.status === 200) {
                localStorage.setItem('accessToken', data.accessToken);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log('Error', e.response.data);
            return thunkAPI.rejectWithValue(e.response.data);
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
    },
    extraReducers: {
        [registerUser.fulfilled.type]: (state, { payload }) => {
            console.log('payload', payload);
            state.loading = false;
            state.error = '';
            return { ...state, ...payload };
        },
        [registerUser.pending.type]: (state) => {
            state.loading = true;
        },
        [registerUser.rejected.type]: (state, { payload }) => {
            state.loading = false;
            state.error = payload.message;
        },
        [loginUser.fulfilled.type]: (state, { payload }) => {
            state.loading = false;
            return { ...state, ...payload };
        },
        [loginUser.rejected.type]: (state, { payload }) => {
            console.log('payload', payload);
            state.loading = false;
            state.error = payload.message;
        },
        [loginUser.pending.type]: (state) => {
            state.loading = true;
        },
    },
});

export const { clearState } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;
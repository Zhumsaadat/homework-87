import {PostsTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import { getPosts } from './postsThunk';

interface Posts {
    posts: PostsTypes[];
    isLoading: boolean;
}

const initialState: Posts = {
    posts: [],
    isLoading: false,
};

export const postsSlice = createSlice({
    name: 'posts/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPosts.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.posts = items;
        });
        builder.addCase(getPosts.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
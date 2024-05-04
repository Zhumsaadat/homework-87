import {CommentsTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getComments} from './commentsThunk.ts';
import {RootState} from '../../App/store.ts';

interface Comments {
    comments: CommentsTypes[];
    isLoading: boolean;
}

const initialState: Comments = {
    comments: [],
    isLoading: false,
};

export const commentsSlice = createSlice({
    name: 'comments/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getComments.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.comments = items;
        });
        builder.addCase(getComments.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const commentsReducer = commentsSlice.reducer;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectIsLoading = (state: RootState) => state.comments.isLoading;
import {createAsyncThunk} from '@reduxjs/toolkit';
import {CommentsPost, CommentsTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getComments = createAsyncThunk<CommentsTypes[], string>(
    'get/comments',
    async (id) => {
        try {
            const response = await axiosApi.get<CommentsTypes[]>(`/comments?post=${id}`);

            return response.data;
        } catch (err) {
            throw err;
        }
    },
);

export const sendComment = createAsyncThunk<void, CommentsPost>(
    'post/comment',
    async (data) => {
        try {
            const headers = {
                'Authorization': `Bearer ${data.token}`,
            };

            await axiosApi.post('/comments', data, {headers});
        } catch (err) {
            throw err;
        }
    },
);
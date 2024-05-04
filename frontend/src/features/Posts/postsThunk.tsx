import {createAsyncThunk} from '@reduxjs/toolkit';
import {NewPost, PostsTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getPosts = createAsyncThunk<PostsTypes[]>(
    'get/posts',
    async () => {
        try {
            const response = await axiosApi.get<PostsTypes[]>('/posts');

            return response.data;
        } catch (err) {
            throw err;
        }
    },
);

export const addPost = createAsyncThunk<void, NewPost>(
    'add/post',
    async (data) => {
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${data.token}`,
        };

        try {
            await axiosApi.post<NewPost>('/posts', data, {headers});
        } catch (err) {
            throw err;
        }
    },
);
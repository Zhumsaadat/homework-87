import {Box, Button, Grid, TextField} from '@mui/material';
import React, {useState} from 'react';
import {NewPost} from '../../types';
import {useNavigate} from 'react-router-dom';
import { selectUser } from '../Users/userSlice';
import { addPost } from './postsThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import FileInput from '../../components/FileInput';


const PostsForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = useAppSelector(selectUser);

    const [state, setState] = useState<NewPost>({
        title: '',
        description: '',
        image: null,
        token: '',
    });

    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        if (user) {
            await dispatch(addPost({title: state.title, description: state.description, image: state.image, token: user.token}));
        }
        navigate('/');
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState(prevState => ({
                ...prevState, [name]: files[0]
            }));
        }
    };

    return (
        <>
            {user && <Box component="form" onSubmit={formSubmitHandler}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            label="title"
                            name="title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mb: "10px"}}>
                        <TextField
                            label="description"
                            name="description"
                            value={state.description}
                            onChange={inputChangeHandler}
                            fullWidth
                        />
                    </Grid>
                    <FileInput label="image" name="image" onChange={fileInputChangeHandler} />
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}
                >
                    Create post
                </Button>
            </Box>}
        </>
    );
};

export default PostsForm;
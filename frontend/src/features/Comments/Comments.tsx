import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, CircularProgress, Grid, styled, TextField, Typography } from '@mui/material';
import textImage from "../../../public/text.png"
import {selectComments, selectIsLoading} from './commentsSlice.ts';
import {CommentsPost} from '../../types';
import {getComments, sendComment} from './commentsThunk.ts';
import { selectPosts } from '../Posts/postsSlice';
import { selectUser } from '../Users/userSlice';
import { getPosts } from '../Posts/postsThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';


const Comments = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const params = useParams();
    const comments = useAppSelector(selectComments);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    const [state, setState] = useState<CommentsPost>({
        post: '',
        text: '',
        token: '',
    });

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getPosts());
            if (params.id) {
                await dispatch(getComments(params.id));
            }
        };

        void fetchUrl();
    }, [dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        paddingTop: '30%',
        width: '30%',
        height: 0,
        border: '1px solid #000'
    });

    const fetchUrl = async () => {
        if (params.id) {
            await dispatch(getComments(params.id));
        }
    };

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (params.id && user) {
            await dispatch(sendComment({token: user.token, post: params.id, text: state.text}));
        }

        setState((prevState) => ({
            ...prevState,
            text: '',
        }));

        void fetchUrl();

    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const post = posts.find(postElem => postElem._id === params.id);
    return (
        <>
            {post && (
                <Grid item xs={12}>
                    <Card sx={{ width: 800, ml: 'auto', mr: 'auto', mb: '20px' }}>
                        <CardContent sx={{display: 'flex', gap: 3}}>
                            {post.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + post.image}/> : <ImageCardMedia image={textImage} />}
                            <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {post.date}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    {post.user.username}
                                </Typography>
                                <Typography component="div">
                                    {post.title}
                                </Typography>
                                <Typography component="div">
                                    {post.description}
                                </Typography>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>)
            }

            <Grid sx={{display: 'flex', gap: 2}}>
                {user && (
                    <Box component="form" onSubmit={formSubmit}>
                        <TextField
                            label="text"
                            name="text"
                            value={state.text}
                            onChange={inputChangeHandler}
                        />
                        <Button type="submit">Send</Button>
                    </Box>
                )}
            </Grid>

            <Grid container sx={{mt: '20px'}}>
                {!isLoading ? comments.map((elem) => (
                    <Grid item xs={12} sx={{border: "1px solid #000", m: '10px', p: '5px'}} key={elem._id}>
                        <Typography variant="h5">
                            {elem.user.username}
                        </Typography>
                        <Typography component="div">
                            {elem.text}
                        </Typography>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default Comments;
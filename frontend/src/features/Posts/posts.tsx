import {Card, CardContent, CardMedia, Grid, Typography, styled, CircularProgress} from '@mui/material';
import {useEffect} from 'react';
import {Link as LinkRouter} from 'react-router-dom';
import textImage from '../../../public/text.png';
import { getPosts } from './postsThunk';
import { selectIsLoading, selectPosts } from './postsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getPosts());
        };

        void fetchUrl();
    }, [dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        paddingTop: '30%',
        width: '30%',
        height: 0,
        border: '1px solid #000'
    });

    return (
        <>
            <Grid container spacing={3} mt={3}>
                {!isLoading ? posts.map((elem) => (
                    <Grid item xs={12} key={elem._id}>
                        <Card sx={{ width: 800, ml: 'auto', mr: 'auto' }}>
                            <CardContent sx={{display: 'flex', gap: 3}}>
                                {elem.image !== null ? <ImageCardMedia image={'http://localhost:8000' + '/' + elem.image}/> : <ImageCardMedia image={textImage} />}
                                <Typography component="div" sx={{display: 'flex', flexDirection: 'column'}}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {elem.date}
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        {elem.user.username}
                                    </Typography>
                                    <LinkRouter to={`/post/${elem._id}`}>{elem.title}</LinkRouter>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )) :  <CircularProgress />}
            </Grid>
        </>
    );
};

export default Posts;
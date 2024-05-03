import express from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { PostMutation } from '../types';
import { format } from 'date-fns';
import commentRouter from './comments';

const postsRoutes = express.Router();

postsRoutes.get('/', async (req, res, next) => {
    try{
        const posts: PostMutation[] = await Post.find();
        if (!posts || posts.length === 0) {
            console.log('No posts found');
            return res.status(404).send('No posts found');
        }

         const postsWithUserName = [];

        if (posts) {
            for (const post of posts) {
                const user = await User.findById(post.user);
                console.log(post)
                const postWithUserName = {
                    user: user?.username,
                    title: post.title,
                    image: post.image,
                    date: format(post.date,'dd.MM.yyyy HH.mm'),
                    description: post.description
                };
                postsWithUserName.push(postWithUserName);
            }
        }else {
            console.log('no')}

        res.send(postsWithUserName);

    } catch (e) {
        next(e);
    }
});

postsRoutes.post('/', async (req, res, next) =>{
    try {
        const headerValue = req.get('Authorization');

        if (!headerValue) {
            return res.status(401).send({error: 'No token provided!'});
        }

        const [_, token] = headerValue.split(' '); //Bearer token

        const user = await User.findOne({token});

        if (!user) {
            return res.status(403).send({error: 'Wrong token!'});
        }

        if(!req.body.title || (!req.body.description && !req.body.image)) {
            return res.status(422).send({error: 'Fields are required!'});
        }

        const post = new Post({
            user: user._id,
            title: req.body.title,
            description: req.body.description || null,
            image: req.body.image || null,
        })

        await post.save();
        return res.send(post);

    }catch (e){
        next(e);
    }
});

commentRouter.get('/:id')

export default postsRoutes;
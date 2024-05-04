import express from 'express';
import Post from '../models/Post';
import User from '../models/User';
import { format } from 'date-fns';
import commentRouter from './comments';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../midlleware/auth';

const postsRoutes = express.Router();

postsRoutes.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      console.log('No posts found');
      return res.status(404).send('No posts found');
    }

    const postsWithUserName = [];

    if (posts) {
      for (const post of posts) {
        const user = await User.findById(post.user);
        const postWithUserName = {
          _id: post._id,
          user: user?.username,
          title: post.title,
          image: post.image,
          date: format(post.date, 'dd.MM.yyyy HH.mm'),
          description: post.description
        };
        postsWithUserName.push(postWithUserName);
      }
    } else {
      console.log('no')
    }

    res.send(postsWithUserName);

  } catch (e) {
    next(e);
  }
});

postsRoutes.get('/:id', async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) {
      console.log('No posts found');
      return res.status(404).send('No posts found');
    }
    if (post.user && typeof post.user === 'object' && 'username' in post.user) {
      const username = post.user.username
      const postWithUserName = {
        _id: post._id,
        title: post.title,
        date: format(post.date, 'dd.MM.yyyy HH.mm'),
        description: post.description,
        image: post.image,
        user: username,
      }

      res.send(postWithUserName);
    }
  } catch (e) {
    next(e);
  }
});

postsRoutes.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  try {

    if (!req.body.title || (!req.body.description && !req.body.image)) {
      return res.status(422).send({error: 'Fields are required!'});
    }

    const user = (req as RequestWithUser).user;

    const post = new Post({
      user: user?._id,
      title: req.body.title,
      description: req.body.description || null,
      image: req.file ? req.file.filename : null,
    })

    await post.save();
    return res.send(post);

  } catch (e) {
    next(e);
  }
});

commentRouter.get('/:id')

export default postsRoutes;
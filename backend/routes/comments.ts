import Comment from '../models/Coment';
import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../midlleware/auth';

const commentRouter = express.Router();

commentRouter.post('/', auth, async (req, res, next) => {
  try {

    if (!req.body.text) {
      return res.status(422).send({error: 'Fields are required!'});
    }

    const user = (req as RequestWithUser).user;

    const comment = new Comment({
      user: user?._id,
      post: req.body.post,
      text: req.body.text,
    });

    await comment.save();
    return res.send(comment);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }

    return next(e);
  }
});

commentRouter.get('/', async (req, res, next) => {
  try {
    const post = req.query.post

    const comment = await Comment.find({post: post});
    return res.send(comment);


  } catch (e) {
    next(e);
  }
})

export default commentRouter;
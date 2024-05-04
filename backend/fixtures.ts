import mongoose from 'mongoose';
import User from './models/User';
import config from './config';
import crypto from 'crypto';
import Post from './models/Post';
import Comment from './models/Coment';


const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  try{
    await  db.dropCollection('posts');
    await  db.dropCollection('comments');
    await  db.dropCollection('users');
  }catch (e) {
    console.log('Collections were not present, skipping drop...')
  }

  const [user1, user2] = await User.create(
    {
      username: 'saadat',
      password: '123',
      token: crypto.randomUUID(),
    },
    {
      username: 'saadat2',
      password: '456',
      token: crypto.randomUUID(),
    });

  const [post1, post2, post3] = await Post.create (
    {
      title: 'post1',
      date: Date.now().toString(),
      description: 'description title1 ',
      image: 'fixtures/cs2bug.webp',
      user: user1._id,
   },
    {
      title: 'post2',
      date: Date.now().toString(),
      description: 'description title1 ',
      image: 'fixtures/cs2sticker.webp',
      user: user2._id,
    },
    {
      title: 'post3',
      date: Date.now().toString(),
      description: 'description title1 ',
      image: 'fixtures/cs2sticker.webp',
      user: user1._id,
    });

  await Comment.create(
    {
      user: user1._id,
      post: post1._id,
      text: 'supper',
      date: new Date().toISOString(),
    },
    {
      user: user2,
      post: post2,
      text: 'very good!',
      date: new Date().toISOString(),
    },
    {
      user: user1._id,
      post: post2._id,
      text: 'amazing!',
      date: new Date().toISOString(),
    },
    {
      user: user2._id,
      post: post3._id,
      text: 'Done',
      date: new Date().toISOString(),
    },
  );

  await db.close();
};

void run();
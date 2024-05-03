import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import cors from 'cors'
import postsRoutes from './routes/posts';
import usersRouter from './routes/users';
import commentRouter from './routes/comments';

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/posts', postsRoutes);
app.use('/users', usersRouter);
app.use('/comment', commentRouter);

const run = async () => {
    await mongoose.connect(config.mongoose.db);

    app.listen(port, () => {
        console.log(`Port: ${port}`);
    });

    process.on('exit', () =>{
        mongoose.disconnect();
    });
};

void run();

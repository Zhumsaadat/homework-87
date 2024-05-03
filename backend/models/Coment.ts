import mongoose, { Types } from 'mongoose';
import User from './User';
import Post from './Post';

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => {
        const user = await User.findById(id);
        return !!user;
      },
      message: 'User does not exist!',
    }
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    validate: {
      validator: async (id: Types.ObjectId) => {
        const user = await Post.findById(id);
        return !!user;
      },
      message: 'Post does not exist!',
    }
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now().toString(),
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
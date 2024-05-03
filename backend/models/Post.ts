import mongoose, { Types } from 'mongoose';
import User from './User';


const Schema = mongoose.Schema;

interface PostDocument extends Document {
    title: string;
    date: Date;
    description: string;
    image: string;
    user: Types.ObjectId;
}


const PostSchema = new Schema<PostDocument>({
    title:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    description:{
        type:String,
        required: function (this: PostDocument){
           return !this.image;
        }
    },
  image:{
        type: String,
        required: function (this: PostDocument){
           return !this.description;
        }
    },
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
    }
});

const Post = mongoose.model("Post", PostSchema);

 export default Post;
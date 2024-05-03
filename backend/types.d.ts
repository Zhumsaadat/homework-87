import { Model } from 'mongoose';

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

interface UserMethods {
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void;
}


export type UserModel = Model<UserFields, unknown, UserMethods>;

export interface PostMutation{
    user: string;
    title: string;
    image: string | null;
    description: string | null;
    date: string
}

export interface CommentMutation {
    user: string;
    post: string;
    text: string;
}
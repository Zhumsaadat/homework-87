export interface RegisterMutation {
    username: string;
    password: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface UserTypes {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        },
    },
    message: string;
    name: string;
    _message: string;
}

export interface RegisterResponse {
    message: string;
    user: UserTypes;
}

export interface GlobalError {
    error: string;
}

export interface PostsTypes {
    _id: string;
    user: {
        username: string;
    };
    title: string;
    description: string;
    image: string | null;
    datetime: string;
}

export interface NewPost {
    title: string;
    description: string;
    image: file | null;
    token: string;
}

export interface CommentsTypes {
    _id: string;
    user: {
        username: string;
    };
    post: string;
    text: string;
}

export interface CommentsPost {
    post: string;
    text: string;
    token: string;
}
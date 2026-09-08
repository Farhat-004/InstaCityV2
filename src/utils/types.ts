type Token = string;

type Like = {
    _id: string;
    name: string;
    avatar: string;
}
type Post = {
    author: Author;
    _id: string;
    avatar: string;
    caption: string;
    comments: Comment[];
    commentsCount: number;
    createdAt: string;
    image: string;
    likes: Like[],
    likesCount: number;
    name: string;
    updatedAt: string;
    _v: number;
};
type User = {
    _id: string;
    name: string;
    username?: string;
    email: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    bio: string;
    posts: Post[];
    friends: string[];
    Notifications: string[];
    website: string;
}

type Comment = {
    author: Author,
    comment: string,
    likesCount: number,
    createdAt: string,
    updatedAt: string,
    _id: string,
}
type Auth = {
    user: User;
    accessToken: Token;
    refreshToken: Token;
}

type Author = {
    name: string;
    avatar: string;
    _id: string;
}

export type { Token, Post, User, Auth, Author, Like, Comment };
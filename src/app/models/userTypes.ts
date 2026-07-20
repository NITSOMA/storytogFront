import { Chapter, NotificationListModel,  StoryListModel } from "./storyTypes";

export interface LoginRequestInterface {
    login_id: string;
    password: string;
}



export interface UserProfileInterface {
    id: number;
    username: string;
    email: string;
    age: number;
    about: string | null;
    profile_image: string | null;
    cover_image: string | null;
    notifications: NotificationListModel[]  | []
    contributed_stories: StoryListModel[] | []
    
}


export interface RegisterRequestInterface {
    username: string;
    email: string;
    password: string;
    age: number
    profile_image?: File | null;
}


export interface LoginResponse {
    access: string
}

export interface AuthorRead {
    id: number;
    username: string;
    about: string | null;
    profile_image: string | null;
    contributed_stories: StoryListModel[] | []
}
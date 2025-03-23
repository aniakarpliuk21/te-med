export interface IUser {
    _id: string;
    username: string;
    email: string;
    password: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface IUserCreate {
    username: string;
    email: string;
    password: string;
}
export interface IUserLogin{
    email: string;
    password: string;
}

export interface IUserResponse {
    _id: string;
    username: string;
    email: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
}



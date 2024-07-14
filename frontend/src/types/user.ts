
export type TUser = {
    _id: string,
    name: string;
    email: string;
    password: string;
    activity: string[];
    createdAt?: Date;
    updatedAt?: Date;
};
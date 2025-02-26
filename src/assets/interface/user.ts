export interface User {
    user_id: number;
    user_name: string;
    password: string;
    email: string;
    comments: {
        id_comment: number;
        id_user: number;
        comment: string;
    }[];
}
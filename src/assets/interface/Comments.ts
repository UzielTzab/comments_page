export interface User {
    user_name: string;
}

export interface CommentInterface {
    id_comment: number;
    id_user: number;
    comment: string;
    user: User;
}
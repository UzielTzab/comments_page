import { CommentInterface } from "../interface/Comments";

const API_BASE_URL = "https://apiflowershop.onrender.com/api";

export async function GetAllComments(): Promise<CommentInterface[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/comments`);
        if (!response.ok) {
            throw new Error("Ocurrió un problema al traer todos los comentarios");
        }
        const data = await response.json();
        console.log("Datos traidos con éxito");
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
export async function CreateComment(idUser: number, comment: string) {

    const userData = {
        id_user: idUser,
        comment: comment
    }

    try {
        const response = await fetch(`${API_BASE_URL}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error("Ocurrió un problema al crear el comentario");
        }
        const data = await response.json();
        console.log("Comentario creado con éxito");
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function UpdateComment(id_comment: number, comment: Partial<CommentInterface>): Promise<CommentInterface | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${id_comment}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        });
        if (!response.ok) {
            throw new Error("Ocurrió un problema al actualizar el comentario");
        }
        const data: CommentInterface = await response.json();
        console.log("Comentario actualizado con éxito");
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function DeleteComment(id_comment: number): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/comments/${id_comment}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Ocurrió un problema al eliminar el comentario");
        }
        console.log("Comentario eliminado con éxito");
    } catch (error) {
        console.error(error);
    }
}
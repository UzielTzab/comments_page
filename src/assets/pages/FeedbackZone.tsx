import { useState } from "react";
import { CreateComment, DeleteComment, UpdateComment } from "../services/CommentsService";
import { CommentInterface } from "../interface/Comments";
import { Header } from "../components/Header";

export function FeedbackZone() {
    const [comments, setComments] = useState<string[]>([]);
    const [newComment, setNewComment] = useState("");
    const [newUsername, setNewUserName] = useState("");
    const [comment, setComment] = useState<CommentInterface>({ id_comment: 0, id_user: 0, comment: "" });

    function handleAddComment() {
        if (newComment.trim() !== "") {
            setComments([...comments, newComment]);
            setNewComment("");
        }
    }
    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const createdComment = await CreateComment(comment);
            if (createdComment) {
                console.log("Comentario creado:", createdComment);
                // Mostrar modal de éxito o redirigir
            }
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            // Mostrar modal de error
        }
    }

    async function handleUpdateComment(id_comment: number, updatedText: string) {
        try {
            const updatedComment = await UpdateComment(id_comment, { comment: updatedText });
            if (updatedComment) {
                console.log("Comentario actualizado:", updatedComment);
                // Mostrar modal de éxito o redirigir
            }
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
            // Mostrar modal de error
        }
    }

    async function handleDeleteComment(id_comment: number) {
        try {
            await DeleteComment(id_comment);
            console.log("Comentario eliminado");
            // Mostrar modal de éxito o redirigir
        } catch (error) {
            console.error("Error al eliminar el comentario:", error);
            // Mostrar modal de error
        }
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center">Zona de comentarios</h1>
                <div className="card p-4">
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">Escribe tu comentario:</label>
                        <textarea
                            id="comment"
                            className="form-control"
                            rows={3}
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button className="btn btn-primary" onClick={handleAddComment}>Agrega tu comentario</button>
                </div>
                <div className="mt-4">
                    <h2>Comentarios</h2>
                    {comments.length === 0 ? (
                        <p>No hay comentarios aún.</p>
                    ) : (
                        <ul className="list-group">
                            {comments.map((comment, index) => (
                                <li key={index} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">Username</h5>
                                            <p className="mb-1">{comment}</p>
                                        </div>
                                        <div>
                                            <button className="btn btn-primary btn-sm me-2">Editar</button>
                                            <button className="btn btn-danger btn-sm">Eliminar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Success Modal */}
                <div className="modal fade" id="successModal" tabIndex={-1} aria-labelledby="successModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-success text-white">
                            <div className="modal-header">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                                <h5 className="modal-title ms-3" id="successModalLabel">
                                    <i className="bi bi-check-circle-fill"></i> Éxito
                                </h5>
                            </div>
                            <div className="modal-body">
                                <p>La operación se completó con éxito. Serás rederigido en unos segundos a los comentarios.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Error Modal */}
                <div className="modal fade" id="errorModal" tabIndex={-1} aria-labelledby="errorModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-danger text-white">
                            <div className="modal-header">
                                <h5 className="modal-title" id="errorModalLabel"> <i className="bi bi-x-circle-fill"></i>Error!!</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Ocurrió un error al procesar la solicitud. Por favor, inténtelo de nuevo más tarde.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loading Modal */}
                <div className="modal fade" id="loadingModal" tabIndex={-1} aria-labelledby="loadingModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="loadingModalLabel"> <i className="bi bi-info-circle-fill"></i> Guardando...</h5>
                            </div>
                            <div className="modal-body d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Cargando...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
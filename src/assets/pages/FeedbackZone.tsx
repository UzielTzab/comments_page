import { useState, useEffect } from "react";
import { CreateComment, GetAllComments, DeleteComment, UpdateComment } from "../services/CommentsService";
import { CommentInterface } from "../interface/Comments";
import { Header } from "../components/Header";
import { Modal } from "bootstrap";

export function FeedbackZone() {
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    // Cargar los comentarios al cargar el componente
    useEffect(() => {
        async function loadComments() {
            const data = await GetAllComments();
            console.log("Comentarios cargados:", data);
            setComments(data);
        }
        loadComments();
    }, []);

    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        try {
            const idUserString = sessionStorage.getItem("id");
            if (idUserString) {
                const idUser = parseInt(idUserString, 10);
                const createdComment = await CreateComment(idUser, newComment);
                console.log("Comentario creado:", createdComment);
                if (createdComment) {
                    setNewComment("");
                    // Volver a cargar los comentarios para obtener los más recientes
                    const data = await GetAllComments();
                    setComments(data);
                }
            } else {
                console.error("No se encontró el id del usuario en sessionStorage");
                // Mostrar modal de error
            }
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            // Mostrar modal de error
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (loading) {
            const loadingModalEl = document.getElementById("loadingModal");
            if (loadingModalEl) {
                const loadingModal = new Modal(loadingModalEl);
                loadingModal.show();
            }
        } else {
            const loadingModalEl = document.getElementById("loadingModal");
            if (loadingModalEl) {
                const loadingModal = Modal.getInstance(loadingModalEl);
                if (loadingModal) {
                    loadingModal.hide();
                }
            }
        }
    }, [loading]);

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
                    <button className="btn btn-primary" onClick={HandleSubmit}>Agrega tu comentario</button>
                </div>
                <div className="mt-4">
                    <h2>Comentarios</h2>
                    {comments.length === 0 ? (
                        <p>No hay comentarios aún.</p>
                    ) : (
                        <ul className="list-group">
                            {comments.map((comment) => (
                                <li key={comment.id_comment} className="list-group-item">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="mb-1">{comment.user.user_name}</h5>
                                            <p className="mb-1">{comment.comment}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
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
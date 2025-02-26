import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
// import { Modal } from "bootstrap";
import { GetAllComments } from "../services/CommentsService";
import { GetLoginUser } from "../services/UserService";

export function LoginForm() {


    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");


    function NavigateToFeedbackPage() {
        navigate("/FeedbackPage");
    }

    function NavigateToSingForm() {
        navigate("/SingForm");
    }
    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        try {
            const user = await GetLoginUser(email, password);
            if (user) {
                console.log("Usuario logueado:", user);
                alert(user);

                sessionStorage.setItem("userName", user.user_name);
                sessionStorage.setItem("email", user.email);
                navigate("/FeedbackPage");
            } else {
                // Mostrar modal de error
                console.error("Error al iniciar sesión");
                alert(Error);
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            // Mostrar modal de error
        }
    }

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4" style={{ width: '400px' }}>
                    <h1 className="text-center">Iniciar sesión</h1>
                    <button className="btn btn-link" onClick={NavigateToFeedbackPage}>Ir a la página de comentarios</button>
                    <form onSubmit={HandleSubmit} className="row g-3">

                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Correo Eletrónico</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="col-12 d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">Iniciar</button>
                            <button onClick={NavigateToSingForm} type="button" className="btn btn-secondary">Crear cuenta</button>
                        </div>
                    </form>
                </div>
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
        </>
    );
}
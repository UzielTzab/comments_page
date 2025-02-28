import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { GetLoginUser } from "../services/UserService";
import { Modal } from "bootstrap";

export function LoginForm() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [limitReached, setLimitReached] = useState(false);
    const maxAttempts = 3;

    function NavigateToFeedbackPage() {
        navigate("/FeedbackPage");
    }

    function NavigateToSingForm() {
        navigate("/SingForm");
    }

    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);

        try {
            const user = await GetLoginUser(email, password);
            setLoading(false);
            if (user) {
                console.log("Usuario logueado:", user);
                sessionStorage.setItem("id", user.user_id.toString());
                sessionStorage.setItem("userName", user.user_name);
                sessionStorage.setItem("email", user.email);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    NavigateToFeedbackPage();
                }, 2000);
            } else {
                setAttempts(prev => prev + 1);
                if (attempts + 1 >= maxAttempts) {
                    setLimitReached(true);
                } else {
                    setError(true);
                    setTimeout(() => {
                        setError(false);
                    }, 2000);
                }
                console.error("Error al iniciar sesión");
            }
        } catch (error) {
            setLoading(false);
            setAttempts(prev => prev + 1);
            if (attempts + 1 >= maxAttempts) {
                setLoading(false);
                setLimitReached(true);
            } else {
                setLoading(false);
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 2000);
            }
            console.error("Error al iniciar sesión:", error);
        }
    }

    useEffect(() => {
        const toggleModal = (modalId: string, show: boolean) => {
            const modalEl = document.getElementById(modalId);
            if (modalEl) {
                const modalInstance = Modal.getOrCreateInstance(modalEl);
                if (show) {
                    modalInstance.show();
                } else {
                    modalInstance.hide();
                }
            }
        };

        toggleModal("loadingModal", loading);
        toggleModal("successModal", success);
        toggleModal("errorModal", error);
        toggleModal("limitReachedModal", limitReached);
    }, [loading, success, error, limitReached]);

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card p-4" style={{ width: '400px' }}>
                    <h1 className="text-center">Iniciar sesión</h1>
                    <button className="btn btn-link" onClick={NavigateToFeedbackPage}>Ir a la página de comentarios</button>
                    <form onSubmit={HandleSubmit} className="row g-3">
                        <div className="col-12">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
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
                            <h5 className="modal-title" id="successModalLabel">
                                <i className="bi bi-check-circle-fill"></i> Éxito
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>La operación se completó con éxito. Serás redirigido en unos segundos.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Modal */}
            <div className="modal fade" id="errorModal" tabIndex={-1} aria-labelledby="errorModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-danger text-white">
                        <div className="modal-header">
                            <h5 className="modal-title" id="errorModalLabel"><i className="bi bi-x-circle-fill"></i> Error</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Ocurrió un error. Por favor, inténtelo de nuevo más tarde.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Loading Modal */}
            <div className="modal fade" id="loadingModal" tabIndex={-1} aria-labelledby="loadingModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="loadingModalLabel"><i className="bi bi-info-circle-fill"></i> Guardando...</h5>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Limit Reached Modal */}
            <div className="modal fade" id="limitReachedModal" tabIndex={-1} aria-labelledby="limitReachedModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content bg-warning text-dark">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limitReachedModalLabel"><i className="bi bi-exclamation-triangle-fill"></i> Lo sentimos...</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Has alcanzado el límite de intentos.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

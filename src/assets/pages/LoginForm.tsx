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
                }, 3000);
            } else {
                setError(true);
                // setTimeout(() => {
                //     setError(false);
                // }, 3000);
                console.error("Error al iniciar sesión");
            }
        } catch (error) {
            setLoading(false);
            setError(true);
            // setTimeout(() => {
            //     setError(false);
            // }, 3000);
            console.error("Error al iniciar sesión:", error);
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
            <div className={`modal fade ${success ? 'show' : ''}`} id="successModal" tabIndex={-1} aria-labelledby="successModalLabel" aria-hidden={!success} style={{ display: success ? 'block' : 'none' }}>
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
                            <p>La operación se completó con éxito. Serás redirigido en unos segundos a la página de comentarios.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Error Modal */}
            <div className={`modal fade ${error ? 'show' : ''}`} id="errorModal" tabIndex={-1} aria-labelledby="errorModalLabel" aria-hidden={!error} style={{ display: error ? 'block' : 'none' }}>
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
            <div className={`modal fade ${loading ? 'show' : ''}`} id="loadingModal" tabIndex={-1} aria-labelledby="loadingModalLabel" aria-hidden={!loading} style={{ display: loading ? 'block' : 'none' }}>
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
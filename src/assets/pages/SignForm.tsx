import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export function SingForm() {

    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");

    function NavigateToLoginForm() {
        navigate("/LoginForm");
    }

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                    <h2 className="card-title text-center mb-4">Crear cuenta</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Nombre de usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={Username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={Password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="d-grid">
                            <button onClick={NavigateToLoginForm} className="btn btn-primary" type="submit">Crear</button>
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
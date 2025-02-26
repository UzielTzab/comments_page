import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { SignUser } from "../services/UserService";
import { User } from "../interface/user";

export function SingForm() {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    function NavigateToLoginForm() {
        navigate("/LoginForm");
    }

    async function HandleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);

        const newUser: User = {
            user_id: 0,
            user_name: Username,
            password: Password,
            email: Email,
            comments: []
        };

        try {
            const user = await SignUser(newUser);
            setLoading(false);
            if (user) {
                console.log("Usuario registrado:", user);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    NavigateToLoginForm();
                }, 3000);
            } else {
                setError(true);
                console.error("Error al registrar el usuario");
            }
        } catch (error) {
            setLoading(false);
            setError(true);
            console.error("Error al registrar el usuario:", error);
        }
    }

    return (
        <>
            <Header />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                    <h2 className="card-title text-center mb-4">Crear cuenta</h2>
                    <form onSubmit={HandleSubmit}>
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
                            <button className="btn btn-primary" type="submit">Crear</button>
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
                            <p>La operación se completó con éxito. Serás redirigido en unos segundos a la página de inicio de sesión.</p>
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
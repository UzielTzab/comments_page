import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        const storedUserName = sessionStorage.getItem("userName");
        if (storedEmail) {
            setEmail(storedEmail);
        }
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    function handleNavigation(path: string) {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("userName");
        setEmail("");
        setUserName("");
        navigate(path);
    }

    function handleLogout() {
        handleNavigation("/");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a
                    className="navbar-brand fw-bolder fs-4"
                    href="/"
                    onClick={(e) => {
                        e.preventDefault();
                        handleNavigation("/");
                    }}
                >
                    ORIZON
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigation("/");
                                }}
                            >
                                Home
                            </a>
                        </li>

                        {email && (
                            <li className="nav-item">
                                <a className="nav-link" href="/FeedbackPage">Comentarios</a>
                            </li>
                        )}
                    </ul>
                </div>

                {email && (
                    <div className="d-flex align-items-center">
                        <span className="me-3">{userName || email}</span>
                        <button
                            className="btn btn-link text-decoration-none"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
}
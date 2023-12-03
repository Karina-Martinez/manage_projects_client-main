import { useNavigate } from "react-router-dom";

function HeaderComponent() {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem('token-manage-projects');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid justify-content-end">
                <button className="btn btn-danger" onClick={() => cerrarSesion()}>Cerrar sesión</button>
            </div>
        </nav>
    );
}

export default HeaderComponent;
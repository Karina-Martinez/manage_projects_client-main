import { useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

function LoginView() {
    const navigate = useNavigate();
    const emailInputElement = useRef();
    const passwordInputElement = useRef();

    const formHandler = useCallback(
        () => async (event) => {
            event.preventDefault();

            try {
                let formData = new FormData();
                formData.append('email', emailInputElement.current?.value);
                formData.append('password', passwordInputElement.current?.value);

                const url = 'https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/auth/login';

                const opciones = {
                    method: 'POST',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: formData
                };

                const response = await fetch(url, opciones);
                const { access_token } = await response.json();
                
                if (access_token) {
                    localStorage.setItem('token-manage-projects', access_token);
                    navigate('/');
                } else {
                    alert("Credenciales de acceso inválidas.");
                }
            } catch (error) {
                alert("Hubo un error.");
                console.log(error);
            }
        },
        []
    );

    return (
        <main className="auth-main">
            <section className="container p-5 d-flex justify-content-center align-items-center">
                <div className="border border-light rounded p-5">
                    <form onSubmit={ formHandler() }>
                        <div className="text-center mb-4">
                            <h2 className="text-white">Iniciar sesión</h2>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="inputEmail">Correo electrónico</label>
                            <input type="email" id="inputEmail" className="form-control" ref={emailInputElement} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="inputPassword">Contraseña</label>
                            <input type="password" id="inputPassword" className="form-control" ref={passwordInputElement} />
                        </div>

                        <div className="form-outline text-center mb-4">
                            <button type="submit" className="btn btn-success">Iniciar sesión</button>
                        </div>

                        <div className="text-center">
                            <p className="text-white">¿No tienes una cuenta? <a href="/register" className="text-white"><strong>Registrate</strong></a></p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default LoginView;
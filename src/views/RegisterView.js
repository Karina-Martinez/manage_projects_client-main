import { useRef, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

function RegisterView() {
    const navigate = useNavigate();
    const fullNameInputElement = useRef();
    const emailInputElement = useRef();
    const passwordInputElement = useRef();
    const passwordConfirmationInputElement = useRef();

    const formHandler = useCallback(
        () => async (event) => {
            event.preventDefault();

            try {
                let formData = new FormData();
                formData.append('name', fullNameInputElement.current?.value);
                formData.append('email', emailInputElement.current?.value);
                formData.append('password', passwordInputElement.current?.value);
                formData.append('password_confirmation', passwordConfirmationInputElement.current?.value);

                const url = 'https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/auth/register';

                const opciones = {
                    method: 'POST',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: formData
                };

                const response = await fetch(url, opciones);
                const { user } = await response.json();

                if (user) {
                    alert("La cuenta se ha creado satisfactoriamente, ahora inicia sesión.");
                    navigate('/login');
                } else {
                    alert("El correo que intentas crear ya se encuentra registrado en el sistema.");
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
                            <h2 className="text-white">Crear cuenta</h2>
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="inputName">Nombre</label>
                            <input type="text" id="inputName" className="form-control" ref={fullNameInputElement} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="inputEmail">Correo electrónico</label>
                            <input type="email" id="inputEmail" className="form-control" ref={emailInputElement} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="inputPassword">Contraseña</label>
                            <input type="password" id="inputPassword" className="form-control" ref={passwordInputElement} />
                        </div>

                        <div className="form-outline mb-4">
                            <label className="form-label text-white" htmlFor="registerRepeatPassword">Repetir contraseña</label>
                            <input type="password" id="registerRepeatPassword" className="form-control" ref={passwordConfirmationInputElement} />
                        </div>

                        <div className="form-outline text-center mb-4">
                            <button type="submit" className="btn btn-success">Crear cuenta</button>
                        </div>

                        <div className="text-center">
                            <p className="text-white">¿Ya tienes una cuenta? <a href="/login" className="text-white"><strong>Inicia sesión</strong></a></p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default RegisterView;
import { isExpired } from "react-jwt";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import HeaderComponent from '../components/HeaderComponent';
import ProjectComponent from '../components/ProjectComponent';
import ModalCrearProyecto from '../components/ModalCrearProyecto';
import ModalEditarProyecto from '../components/ModalEditarProyecto';

function HomeView() {
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [proyectoSeleccionado, setProyectoSeleccionado] = useState({});
    const [showModalCrearProyecto, setShowModalCrearProyecto] = useState(false);
    const [showModalEditarProyecto, setShowModalEditarProyecto] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token-manage-projects');

        if (!token || isExpired(token)) {
            localStorage.removeItem('token-manage-projects');
            navigate('/login');
        }

        obtenerProyectos();
    }, [navigate]);

    const obtenerProyectos = async () => {
        const url = 'https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/proyectos';

        const response = await fetch(url);
        const proyectosResponse = await response.json();
        setProyectos(proyectosResponse);
    };

    const cerrarModalEdit = (proyectoEditado = false) => {
        if (proyectoEditado) {
            obtenerProyectos();
        }

        setShowModalEditarProyecto(false);
    };

    const cerrarModalCrear = (proyectoCreado = false) => {
        if (proyectoCreado) {
            obtenerProyectos();
        }

        setShowModalCrearProyecto(false);
    };

    const buttonShowModalCreateClicked = () => {
        setShowModalCrearProyecto(true);
    };
    
    const buttonShowModalEditClicked = (proyecto) => {
        setShowModalEditarProyecto(true);
        setProyectoSeleccionado(proyecto);
    };

    const buttonDeleteProjectClicked = async (proyecto) => {
        if (window.confirm("¿Estás seguro de eliminar el proyecto y todas sus tareas?")) {
            try {
                const url = `https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/proyectos/${proyecto.id}`;

                const opciones = {
                    method: 'DELETE',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                };

                await fetch(url, opciones);
                obtenerProyectos();
            } catch (error) {
                alert("Hubo un error.");
                console.log(error);
            }
        }
    };

    return (
        <>
            { 
                showModalCrearProyecto
                    ? <ModalCrearProyecto
                        cerrarModalCrear={cerrarModalCrear}
                        /> 
                    : ''
            }

            { 
                showModalEditarProyecto
                    ? <ModalEditarProyecto
                            proyecto={proyectoSeleccionado}
                            cerrarModalEdit={cerrarModalEdit}
                        />
                    : ''
            }

            <HeaderComponent/>

            <div className="container p-5">
                <h1 className="title text-center">Proyectos</h1>

                <div className="text-center">
                    <button className="btn btn-success mt-4 mb-5" onClick={buttonShowModalCreateClicked}>Crear proyecto</button>
                </div>

                <div className="row">
                    { 
                        proyectos.map(proyecto => {
                            return <div className="col-4" key={proyecto.id}>
                                <ProjectComponent
                                    proyecto={proyecto}
                                    buttonShowModalEditClicked={buttonShowModalEditClicked}
                                    buttonDeleteProjectClicked={buttonDeleteProjectClicked}
                                />
                            </div>;
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default HomeView;
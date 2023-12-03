import Moment from 'react-moment';
import 'moment/locale/es-mx';

import { isExpired } from "react-jwt";
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskComponent from '../components/TaskComponent';
import HeaderComponent from '../components/HeaderComponent';
import ModalCrearTarea from '../components/ModalCrearTarea';
import ModalEditarTarea from '../components/ModalEditarTarea';

function ProjectDetailView() {
    const navigate = useNavigate();
    let { proyectoId } = useParams();
    const [ tarea, setTarea ] = useState({});
    const [ tareas, setTareas ] = useState([]);
    const [ proyecto, setProyecto ] = useState({});
    const [ showModalCrearTarea, setShowModalCrearTarea ] = useState(false);
    const [ showModalEditarTarea, setShowModalEditarTarea ] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token-manage-projects');

        if (!token || isExpired(token)) {
            localStorage.removeItem('token-manage-projects');
            navigate('/login');
        }

        obtenerDetalleProyecto();
    }, [navigate]);

    const obtenerDetalleProyecto = async () => {
        const url = `https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/proyectos/${proyectoId}`;

        const response = await fetch(url);
        const detalleResponse = await response.json();
        setProyecto(detalleResponse);
        setTareas(detalleResponse.tareas);
    };

    const buttonShowModalEditClicked = (tarea) => {
        setTarea(tarea);
        setShowModalEditarTarea(true);
    };

    const buttonDeleteTareaClicked = async (tarea) => {
        if (window.confirm("¿Estás seguro de eliminar la tarea?")) {
            try {
                const url = `https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/tareas/${tarea.id}`;

                const opciones = {
                    method: 'DELETE',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                };

                await fetch(url, opciones);
                obtenerDetalleProyecto();
            } catch (error) {
                alert("Hubo un error.");
                console.log(error);
            }
        }
    };

    const cerrarModalCrear = (tareaCreada = false) => {
        if (tareaCreada) {
            obtenerDetalleProyecto();
        }

        setShowModalCrearTarea(false);
    };

    const buttonShowModalCreateClicked = () => {
        setShowModalCrearTarea(true);
    };

    const cerrarModalEdit = (tareaEditada = false) => {
        if (tareaEditada) {
            obtenerDetalleProyecto();
        }

        setShowModalEditarTarea(false);
    };

    return (
        <>
            {
                showModalCrearTarea
                ? <ModalCrearTarea
                    proyectoId={proyectoId}
                    cerrarModalCrear={cerrarModalCrear}
                    />
                : ''
            }

            {
                showModalEditarTarea
                ? <ModalEditarTarea
                    tarea={tarea}
                    proyectoId={proyectoId}
                    cerrarModalEdit={cerrarModalEdit}
                    />
                : ''
            }

            <HeaderComponent/>

            <div className="container p-5">
                <h1 className="title text-center">{proyecto.nombre}</h1>
                <h3 className="text-center">{proyecto.responsable?.name}</h3>
                <h5 className="text-center mt-4 mb-4">
                    {
                        proyecto.tareas_resumen?.total > 0
                            ? Math.round((proyecto.tareas_resumen?.finalizadas * 100) / proyecto.tareas_resumen?.total)
                            : 0
                    }% completado
                </h5>
                <p>{proyecto.descripcion}</p>
                <p><b>Total de tareas:</b> {proyecto.tareas_resumen?.total}</p>
                <p><b>Tareas completadas:</b> {proyecto.tareas_resumen?.finalizadas}</p>
                <p><b>Fecha de entrega:</b> <Moment format='LL' locale="es">{proyecto.fecha_entrega}</Moment></p>

                <div className="text-center">
                    <button className="btn btn-success mt-4 mb-5 me-2" onClick={buttonShowModalCreateClicked}>Crear tarea</button>
                    <a href="/" className="btn btn-primary mt-4 mb-5">Regresar</a>
                </div>

                <div className="row">
                    { 
                        tareas.map(tarea => {
                            return <div className="col-4" key={tarea.id}>
                                <TaskComponent
                                    tarea={tarea}
                                    buttonShowModalEditClicked={buttonShowModalEditClicked}
                                    buttonDeleteTareaClicked={buttonDeleteTareaClicked}
                                />
                            </div>;
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ProjectDetailView;
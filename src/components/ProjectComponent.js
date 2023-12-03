import Moment from 'react-moment';
import 'moment/locale/es-mx';

function ProjectComponent({ buttonShowModalEditClicked, proyecto, buttonDeleteProjectClicked }) {
    return (
        <div className="card m-4">
            <div className="card-header">
                <h5 className="card-title text-center">{proyecto.nombre}</h5>
                <h6 className="text-center">{proyecto.responsable.nombre}</h6>
            </div>

            <div className="card-body">
                <h5 className="text-center mt-4 mb-4">
                    {
                        proyecto.tareas_resumen.total > 0
                            ? Math.round((proyecto.tareas_resumen.finalizadas * 100) / proyecto.tareas_resumen.total)
                            : 0
                    }% completado
                </h5>
                <p className="card-text">{proyecto.descripcion}</p>
                <p className="card-text"><b>Total de tareas:</b> {proyecto.tareas_resumen.total}</p>
                <p className="card-text"><b>Tareas completadas:</b> {proyecto.tareas_resumen.finalizadas}</p>
                <p className="card-text"><b>Fecha de entrega:</b> <Moment format='LL' locale="es">{proyecto.fecha_entrega}</Moment></p>
            </div>

            <div className="card-footer text-center p-3">
                <button className="btn btn-primary me-2" onClick={() => buttonShowModalEditClicked(proyecto)}>Editar</button>
                <a href={`/proyecto/${proyecto.id}`} className="btn btn-success">Ver detalle</a>
                <button className="btn btn-danger ms-2" onClick={() => buttonDeleteProjectClicked(proyecto)}>Eliminar</button>
            </div>
        </div>
    );
}

export default ProjectComponent;
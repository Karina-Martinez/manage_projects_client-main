import Moment from 'react-moment';
import 'moment/locale/es-mx';

function TaskComponent({ buttonShowModalEditClicked, tarea, buttonDeleteTareaClicked }) {
    return (
        <div className="card m-4">
            <div className="card-header">
                <h5 className="card-title text-center">{tarea.nombre}</h5>
                <h6 className="text-center">{tarea.responsable.nombre}</h6>
            </div>

            <div className="card-body">
                <p className="card-text">{tarea.descripcion}</p>
                <p className="card-text"><b>Estatus:</b> {tarea.estatus.nombre}</p>
                <p className="card-text"><b>Fecha de entrega:</b> <Moment format='LL' locale="es">{tarea.fecha_entrega}</Moment></p>
            </div>

            <div className="card-footer text-center p-3">
                <button className="btn btn-primary me-2" onClick={() => buttonShowModalEditClicked(tarea)}>Editar</button>
                <button className="btn btn-danger" onClick={() => buttonDeleteTareaClicked(tarea)}>Eliminar</button>
            </div>
        </div>
    );
}

export default TaskComponent;
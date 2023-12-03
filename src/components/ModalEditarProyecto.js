import { useRef, useCallback, useEffect, useState } from 'react';

function ModalEditarProyecto({ proyecto, cerrarModalEdit }) {
    const inputNombre = useRef();
    const inputResponsable = useRef();
    const inputDescripcion = useRef();
    const inputFechaEntrega = useRef();
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        const url = 'https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/usuarios';

        const response = await fetch(url);
        const usuariosResponse = await response.json();
        setUsuarios(usuariosResponse);
    };

    const formHandler = useCallback(
        () => async (event) => {
            event.preventDefault();

            try {
                let formData = new FormData();
                formData.append('nombre', inputNombre.current.value);
                formData.append('descripcion', inputDescripcion.current.value);
                formData.append('fecha_entrega', inputFechaEntrega.current.value);
                formData.append('responsable_id', inputResponsable.current.value);

                const url = `https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/proyectos-update/${proyecto.id}`;

                const opciones = {
                    method: 'POST',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: formData
                };

                await fetch(url, opciones);
                cerrarModalEdit(true);
            } catch (error) {
                alert("Hubo un error.");
                console.log(error);
            }
        },
        [cerrarModalEdit, proyecto]
    );

    return (
        <section className="modal_propio">
            <div className="modal_container">
                <form onSubmit={ formHandler() }>
                    <h3 className='text-center mb-4'>Editando proyecto</h3>

                    <label>Nombre:</label>
                    <input className="form-control" type="text" ref={inputNombre} defaultValue={proyecto.nombre} />

                    <label>Responsable:</label>
                    <select className="form-control" ref={inputResponsable} defaultValue={proyecto.responsable}>
                        <option value={null}>...</option>
                        {
                            usuarios.map(usuario => {
                                return <option value={usuario.id} key={usuario.id}>{usuario.name}</option>
                            })
                        }
                    </select>

                    <label>Descripción:</label>
                    <textarea className="form-control" ref={inputDescripcion} defaultValue={proyecto.descripcion}></textarea>

                    <label>Fecha de entrega:</label>
                    <input className="form-control" type="date" ref={inputFechaEntrega} defaultValue={proyecto.fecha_entrega} />

                    <div className="modal_footer mt-2">
                        <button type="submit" className="btn btn-success me-2">Guardar</button>
                        <button type="button" className="btn btn-danger" onClick={() => cerrarModalEdit()}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ModalEditarProyecto;
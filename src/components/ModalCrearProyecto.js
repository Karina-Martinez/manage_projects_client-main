import { useRef, useCallback, useEffect, useState } from 'react';

function ModalCrearProyecto({ cerrarModalCrear }) {
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
                formData.append('nombre', inputNombre.current?.value);
                formData.append('descripcion', inputDescripcion.current?.value);
                formData.append('fecha_entrega', inputFechaEntrega.current?.value);
                formData.append('responsable_id', inputResponsable.current?.value);

                const url = 'https://app-manage-projects-api-f71121111459.herokuapp.com/public/api/proyectos';

                const opciones = {
                    method: 'POST',
                    header:{
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json'
                    },
                    body: formData
                };

                await fetch(url, opciones);
                cerrarModalCrear(true);
            } catch (error) {
                alert("Hubo un error.");
                console.log(error);
            }
        },
        []
    );

    return (
        <section className="modal_propio">
            <div className="modal_container">
                <form onSubmit={ formHandler() }>
                    <h3 className='text-center mb-4'>Agregando proyecto</h3>

                    <label>Nombre:</label>
                    <input className="form-control" type="text" id="inputNombre" ref={inputNombre} />

                    <label>Responsable:</label>
                    <select className="form-control" id="inputResponsable" ref={inputResponsable}>
                        <option value="">...</option>
                        {
                            usuarios.map(usuario => {
                                return <option value={usuario.id} key={usuario.id}>{usuario.name}</option>
                            })
                        }
                    </select>

                    <label>Descripción:</label>
                    <textarea className="form-control" id="inputDescripcion" ref={inputDescripcion}></textarea>

                    <label>Fecha de entrega:</label>
                    <input className="form-control" type="date" id="inputFechaEntrega" ref={inputFechaEntrega} />

                    <div className="modal_footer mt-2">
                        <button type="submit" className="btn btn-success me-2">Agregar</button>
                        <button type="button" className="btn btn-danger" onClick={() => cerrarModalCrear()}>Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ModalCrearProyecto;
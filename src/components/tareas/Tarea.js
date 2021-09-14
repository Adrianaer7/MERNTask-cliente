import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {proyecto} = proyectosContext

    //extraigo de tareaContext.Provider en tareaState   
    const tareasContext = useContext(tareaContext)
    const {eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext

    //Extraer el proyecto
    const [proyectoActual] = proyecto

    //Cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id)   //elimina  del state principal la tarea con el id que estoy iterando, y le paso el id del proyecto actual para que el backend lo verifique
        obtenerTareas(proyectoActual._id)    //paso el id del proyecto actual para que me liste todas las tareas que tiene
    }

    //Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea)
    }

    //Agrega una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)   //llevo la tarea a tareaseleccionada en el state principal
    }

    return ( 
        <li className="tarea sombra">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {tarea.estado
                    ?( <button
                        type="button"
                        className="completo"
                        onClick={() => cambiarEstado(tarea)}
                      >
                          Completo
                      </button>
                    )
                    
                    :( <button
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                      >
                          Incompleto
                      </button>
                    )
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
     );
}
 
export default Tarea;
import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';

import { CSSTransition, TransitionGroup } from 'react-transition-group';    //para las animaciones

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const ListadoTareas = () => {

    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {proyecto, eliminarProyecto} = proyectosContext
    
    //extraigo de tareaContext.Provider en tareaState
    const tareasContext = useContext(tareaContext)
    const {tareasproyecto} = tareasContext


    //Si no hay proyecto seleccionado va a mostrar solo este msj
    if(!proyecto) return <h1>Selecciona un proyecto</h1>

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto   //Como proyecto es un array, declaro un array con el nombre que quiera y se lo paso

    //Cuando hago click en eliminar, le paso el id a la funcion del state
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2> {/*Muestro el nombre del proyecto al que le di click */}

            <ul className="listado-tareas"> {/*Muestro todas las tareas de tareasproyecto */}
                {tareasproyecto.length === 0    
                    ? (<li className="tarea"><p>No hay tareas</p></li>)

                    : 
                     <TransitionGroup>
                        {tareasproyecto.map(tarea => ( 
                            <CSSTransition
                                key={tarea._id}  //el id se translada aca, en vez de pasarlo al componente directamente
                                timeout={200}   //tiempo de animacion
                                classNames="tarea"
                            >
                                <Tarea
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                     </TransitionGroup> 
                }
            </ul>
            
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >
                Eliminar Proyecto&times;
            </button>
            
        </Fragment>
        
     );
}
 
export default ListadoTareas;
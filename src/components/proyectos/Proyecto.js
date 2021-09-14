import React, {useContext} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {proyectoActual} = proyectosContext
    
    //extraigo de tareaContext.Provider en tareaState
    const tareasContext = useContext(tareaContext)
    const {obtenerTareas} = tareasContext 

    //Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id)  //le paso la id del proyecto a la funcion del state de proyecto
        obtenerTareas(id)   //le paso la id del proyecto a la funcion del state de tarea
    }

    return ( 
        <li>
            <button
                type="text"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)} 
            >
                {proyecto.nombre}    {/*Muestro el nombre del proyecto predefinido y/o ingresado */}
            </button>
            

        </li>
     );
}
 
export default Proyecto;
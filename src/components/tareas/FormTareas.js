import React, {useContext, useEffect, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTareas = () => {

    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {proyecto} = proyectosContext
    //extraigo de tareaContext.Provider en tareaState
    const tareasContext = useContext(tareaContext)
    const {errortarea, tareaseleccionada, agregarTarea, validarTarea, actualizarTarea, limpiarTarea} = tareasContext

    //Effect que detecta si hay una tarea seleccionada
    useEffect(() => {
        if(tareaseleccionada) {
            guardarTarea(tareaseleccionada) //si hay una tarea seleccionada, cargo el state del form con la tarea completa. A medida que voy sobreescribiendo desde el input la tareaseleccionada, cambia el state gracias al onChange
        } else {    //si no hay tarea seleccionada, el state estará vacio, por lo tanto el input no muestra nada al cargar el formulario
            guardarTarea({
                nombre: ""
            })
        }
    }, [tareaseleccionada])

    //State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ""
    })
    //extraer
    const {nombre} = tarea

    //Si no hay proyecto seleccionado no muestra el formulario para crear la tarea
    if(!proyecto) return null

    //Array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto   //como proyecto es un array, declaro un array con el nombre que quiera y se lo paso

    const onChange = e => {
        guardarTarea({  //Cada cambio que se haga en el input,
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //Validar
        if(nombre.trim() === "") {
            validarTarea()  //ejecuto la funcion del state
            return
        }

        //Si es edicion o nueva tarea
        if(!tareaseleccionada) {
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id    //creo un campo nuevo en el state de tarea y le paso la id del proyecto seleccionado
            agregarTarea(tarea) //envio el state de tarea al state de tareas principal
        } else {
            //actualizar tarea existente. LLeva la tarea que está cargada en el state al reducer gracias al useEffect
            actualizarTarea(tarea)
            //elimina tarea seleccionada del state
            limpiarTarea()
        }
        
        //Reiniciar el form
        guardarTarea({
            nombre: ""
        })
    }



    return ( 
        <div className="formulario">
            <form onSubmit={onSubmit}>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea"
                        name="nombre"
                        value={nombre}  //Traigo el nombre de la tarea del state al input
                        onChange={onChange}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={tareaseleccionada ? "Guardar cambios" : "Agregar Tarea"} //Cambio la descripcion del boton si hay una tarea cargada en el input
                    />
                </div>
            </form>

            {errortarea //toma el valor del reducer
                ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                : null
            }
        </div>
    );
}
 
export default FormTareas;
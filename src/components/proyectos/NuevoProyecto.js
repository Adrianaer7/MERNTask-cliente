import React, {Fragment, useContext, useState} from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {

    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {formulario, errorformulario, mostrarFormulario, agregarProyecto, mostrarError} = proyectosContext

    //state para el proyecto
    const [proyecto, guardarProyecto] = useState({
        nombre: "",
    })
    //extraer
    const {nombre} = proyecto

    //traer del input
    const onChangeProyecto = e => {
        guardarProyecto({
            ...proyecto,
            [e.target.name] : e.target.value
        })
    }

    //cuando le de a submit
    const onSubmitProyecto = e => {
        e.preventDefault()

        //validar el proyecto
        if(nombre === "") {
            mostrarError()  //se ejecuta la funcion que esta en el state
            return
        }

        //agregar al state
        agregarProyecto(proyecto)   //paso el state de proyecto a proyectoState

        //reiniciar el form. Evita que quede cargado el input con el nombre del proyecto que agregue anteriormente
        guardarProyecto({
            nombre: ""
        })
    }



    return ( 
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => mostrarFormulario()} //cuando le de click, se ejecuta la funcion que esta en proyectoState
            >
            Nuevo Proyecto
            </button>

            { formulario    //el reducer cambia el valor
                ? (
                    <form
                        onSubmit={onSubmitProyecto}
                        className="formulario-nuevo-proyecto"
                    >
                        <input
                            type="text"
                            name="nombre"
                            className="input-text"
                            placeholder="Nombre Proyecto"
                            value={nombre}
                            onChange={onChangeProyecto}
                        />

                        <input
                            type="submit"
                            className="btn btn-block btn-primario"
                            value="Agregar Proyecto"
                        />
                    </form>
                )

                : null
            }
            
            {errorformulario 
                ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                : null
            }
        </Fragment>
    );
}

export default NuevoProyecto;
import React, { useReducer } from 'react';

import clienteAxios from "../../config/axios"

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';

import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types';


const ProyectoState = props => {

    //state
    const initialState = {
        proyectos: [],
        formulario: false,  //mostrar u ocultar el input y button
        errorformulario: false,
        proyecto: null,  //le llega un array. Muestra el proyecto actual seleccionado
        mensaje: null
    }

    //El state va a almacenar valores, el Dispatch para ejecutar las acciones y modificar el state
    const [state, dispatch] = useReducer(proyectoReducer, initialState) // se renombra initialState como state

    //Muestra el formulario
    const mostrarFormulario = () => {   //se utiliza en NuevoProyecto
        dispatch({ 
            type: FORMULARIO_PROYECTO    //en el reducer cambio el valor de formulario a true
        })
    }

    //Obtener los proyectos
    const obtenerProyectos = async () => {    //se utiliza en ListadoProyectos
        try {
            const resultado = await clienteAxios.get("/api/proyectos")
            dispatch({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            }) 

        } catch (error) {
            const alerta = {
                msg: "Hubo un tipo de error",
                categoria: "alerta-error"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    //Agregar nuevo proyecto
    const agregarProyecto = async proyecto => {   //traigo el proyecto de NuevoProyecto
        try {
            const resultado = await clienteAxios.post("/api/proyectos", proyecto)   //envio el proyecto entero
            dispatch({
                type: AGREGAR_PROYECTO,
                payload: resultado.data.proyecto
            })

        } catch (error) {
            const alerta = {
                msg: "Hubo un tipo de error",
                categoria: "alerta-error"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }        
    }

    //Validar formulario por errores
    const mostrarError = () => {    //Se utiliza en NuevoProyecto
        dispatch({
            type: VALIDAR_FORMULARIO
        })
    }

    //Selecciona el proyecto que el usuario dio click
    const proyectoActual = proyectoId => {  //Se utiliza en Proyecto
        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId //obtengo la id del proyecto
        })
    }

    //Elimina un proyecto. 
    const eliminarProyecto = async proyectoId => {    //Tomo la id de ListadoTareas
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
            dispatch({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId 
            }) 

        } catch (error) {
            const alerta = {
                msg: "Hubo un tipo de error",
                categoria: "alerta-error"
            }
            dispatch({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
       
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            {props.children}    {/*Los datos viajan a todos los componentes que sean hijo de este provider */}
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
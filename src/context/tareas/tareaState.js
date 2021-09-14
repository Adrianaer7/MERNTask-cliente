import React, {useReducer} from 'react';
import clienteAxios from "../../config/axios"

import tareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {

    const initialState = {
        tareasproyecto: [],   //van a ser todas las tareas que se muestren en pantalla
        errortarea: false,
        tareaseleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    //Obtener las tareas del proyecto
    const obtenerTareas = async proyecto => {   //Traigo el id del proyecto que clickee. Se utiliza en Proyecto(al tocar en el proyecto), FormTareas(al guardar o eliminar la tarea) y en Tarea(para eliminar la tarea)
        try {
            const resultado = await clienteAxios.get("/api/tareas", {params: {proyecto}})   //se le pasa params para que solo traiga las tareas creadas por id del proyecto seleccionado
            dispatch({
                type: TAREAS_PROYECTO, 
                payload: resultado.data.tareas  //envio todas las tareas que tenga el proyecto que seleccioné
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Agregar una tarea al proyecto seleccionado
    const agregarTarea = async tarea => { //Traigo la nueva tarea de FormTareas
        try {
            const resultado = await clienteAxios.post("/api/tareas", tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea  //le paso la tarea completa
            })

        } catch (error) {
            console.log(error)
        }
    }

    //Valida y muestra un error
    const validarTarea = () => {    //Se utiliza en FormTareas
        dispatch({
            type: VALIDAR_TAREA //cambio errortarea a true en reducer
        })
    }

    //Eliminar tarea por id
    const eliminarTarea = async (id, proyecto) => {   //Se utiliza en Tarea
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })

        } catch (error) {
            console.log(error)   
        }
        
    }

    //Edita o modifica una tarea
    const actualizarTarea = async tarea => {  //La utilizo en FormTareas
        console.log(tarea)
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Trae una tarea para edicion
    const guardarTareaActual = tarea => {   //La utilizo en Tarea
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }


    //Elimina la tarea seleccionada despues de presionar el boton de guardar cambioso agregar tarea
    const limpiarTarea = () => {    //La utilizo en FormTareas
        dispatch({
            type: LIMPIAR_TAREA,
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}

export default TareaState;
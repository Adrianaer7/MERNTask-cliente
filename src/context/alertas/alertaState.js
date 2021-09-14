import React, {useReducer} from 'react';
import alertaReducer from './alertaReducer';
import alertaContext from "./alertaContext"

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';

const AlertaState = props => {
    const initialState = {
        alerta: null
    }

    const [state, dispath] = useReducer(alertaReducer, initialState)

    //Funciones
    const mostrarAlerta = (msg, categoria) => { //se utiliza en NuevaCuenta y en ListadoProyectos
        dispath({
            type: MOSTRAR_ALERTA,
            payload: {
                msg,
                categoria
            }
        })

        //despues de 5s, limpiar el state de alerta
        setTimeout(() => {
            dispath({
                type: OCULTAR_ALERTA
            })
        }, 5000);
    }

    return (
        <alertaContext.Provider
            value={{
                alerta: state.alerta,
                mostrarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState;
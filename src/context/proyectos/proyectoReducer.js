import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
    PROYECTO_ERROR,
} from '../../types';



export default function pepe(state, action) {
    switch(action.type) {   

        case FORMULARIO_PROYECTO:
            return {
                ...state,   //el state es initialState
                formulario: true
            }

        case OBTENER_PROYECTOS:
            return {
                ...state,
                proyectos: action.payload, //traigo los proyectos de la bd y los coloco en el array el state
                proyecto: null
            }
        
        case AGREGAR_PROYECTO:
            return {
                ...state,
                proyectos: [...state.proyectos, action.payload],    //coloco el nuevo proyecto en el state de proyectoState
                formulario: false,   //para que al agregar nuevo proyecto, se esconda el input
                errorformulario: false //si no hay errores, reseteamos el valor
            }
            
            case VALIDAR_FORMULARIO:
                return {
                    ...state,
                    errorformulario: true   //si le doy al boton de agregar proyecto y no tiene nombre, esto pasa a true
                }

            case PROYECTO_ACTUAL:
                return {
                    ...state,
                    proyecto: state.proyectos.filter(proyecto => proyecto._id === action.payload),    //si el id del proyecto del state es igual al id del proyecto que clickee, entonces pasa el proyecto entero a proyecto
                }

            case ELIMINAR_PROYECTO:
                return {
                    ...state,
                    proyectos: state.proyectos.filter(proyecto => proyecto._id !== action.payload),   //Va a eliminar al que le demos click
                    proyecto: null  //una vez que se elimina el proyecto, no lo muestro mas en la vista
                }

            case PROYECTO_ERROR:
                return {
                    ...state,
                    mensaje: action.payload
                }
        default:
            return state
    }
}
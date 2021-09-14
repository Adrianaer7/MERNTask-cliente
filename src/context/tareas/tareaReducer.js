import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';


export default function pepepe(state, action) {
    switch(action.type) {
        case TAREAS_PROYECTO:
            return {
                ...state,
                tareasproyecto: action.payload,
                tareaseleccionada: null //para que al cambiar de proyecto seleccionado, el form de tareas se vacie
            }

        case AGREGAR_TAREA:
            return {
                ...state,
                tareasproyecto: [action.payload, ...state.tareasproyecto],   //Pongo la tarea en el state. El payload lo pongo primero para que la nueva tarea se agregue al inicio de la lista
                errortarea: false //para que ya no aparezca el msj de error si el input no se envio vacio
            }
        
        case VALIDAR_TAREA:
            return {
                ...state,
                errortarea: true
            }

        case ELIMINAR_TAREA:
            return {
                ...state,
                tareasproyecto: state.tareasproyecto.filter(tarea => tarea._id !== action.payload)
            }

        case ACTUALIZAR_TAREA:
            return {
                ...state,
                //recorro el state de tareas y me fijo si el id de la tarea del state es igual a la id de la tarea que hice click, modifico su estado y la coloco en el state, sino, la dejo como está
                tareasproyecto: state.tareasproyecto.map(tarea => tarea._id === action.payload._id ? action.payload : tarea)
            }

        case TAREA_ACTUAL:
            return {
                ...state,
                tareaseleccionada: action.payload   //coloca la tarea a la que le di click en editar
            }

        case LIMPIAR_TAREA:
            return {
                ...state,
                tareaseleccionada: null
            }

        default:
            return state;
    }
}
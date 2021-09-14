import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../../types';


export default function pepe(state, action) {
    switch(action.type) {

        case MOSTRAR_ALERTA:
            return {
                alerta: action.payload  //pongo el msj en alerta
            }

        case OCULTAR_ALERTA:
            return {
                alerta: null
            }

        default:
            return state;
    }
}
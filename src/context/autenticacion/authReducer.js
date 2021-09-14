import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';


export default function pepe(state, action) {
    switch(action.type) {
        
        case REGISTRO_EXITOSO:
        case LOGIN_EXITOSO:
            localStorage.setItem("token", action.payload) //Para mantener el token en el navegador de manera persistente y que al recargar la pagina se mantenga la sesión. Puedo ver el token generado en Chrome>Inspeccionar>Application>Local Storage
            return {
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }

        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,  //para que se mantenga este valor al recargar la pagina
                usuario: action.payload,
                cargando: false
            }

        case LOGIN_ERROR:
        case REGISTRO_ERROR:
        case CERRAR_SESION:
            localStorage.removeItem("token")    //se elimina el token generado al querer iniciar sesion o crear usuario con datos incorrectos
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload, //coloco el msj de error en el state
                cargando: false
            }
        default:
            return state;
    }
}
import React, {useReducer} from 'react';
import AuthContext from "./authContext"
import AuthReducer from "./authReducer"
import clienteAxios from '../../config/axios';
import tokenAuth from "../../config/token"

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem("token"),   //el token que obteniamos cuando creabamos un usuario o nos autenticabamos en postman, se va a guardar en localStorage
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    //Inserta un usuario nuevo en la bd
    const registrarUsuario = async datos => {   //traigo nombre, email y password de NuevaCuenta
        try {
            const respuesta = await clienteAxios.post("/api/usuarios", datos)   //pasamos los datos del state de NuevaCuenta a la bd. En respuesta quedan todos los datos del usuario
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.token //contiene el token generado por hacer el .post a usuarios
            })

            //obtener el usuario
            usuarioAutenticado()

        } catch (error) {
            console.log(error.response)
            const alerta = {
                msg: error.response.data.msg,   //segun el error que haya, lo traigo desde nuevaCuenta o de usuarioController
                categoria: "alerta-error"
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta //le paso la alerta creada arriba
            })
        }
    }

    //Retorna el usuario autenticado. Autentico al usuario nuevo
    const usuarioAutenticado = async () => {    //se usa aca, en Proyectos.js, y barra.js
        const token = localStorage.getItem("token") //obtenemos el token del localStorage
        if(token) {
            tokenAuth(token)    //paso el token a token.js
        }

        try {
            const respuesta = await clienteAxios.get("/api/auth")
            
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario //del authController obtengo el usuario
            })

        } catch (error) {
            console.log(error)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    //Cuando el usuario inicia sesion
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post("/api/auth", datos)   //respuesta va a contener los datos del usuario que se quiere autenticar, junto con su token y demas datos

            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })

            //obtener el usuario
            usuarioAutenticado()            

        } catch (error) {
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,   //segun el error que haya, lo traigo desde nuevaCuenta o de usuarioController
                categoria: "alerta-error"
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta //le paso la alerta creada arriba
            })
        }
    }

    //para cerrar sesion del usuario
    const cerrarSesion = () => {    //se usa en barra.js
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}                   
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;
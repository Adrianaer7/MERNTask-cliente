import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {token, mensaje, autenticado, iniciarSesion} = authContext

        //En caso de que el usuario no exista o la password sea incorrecta
    useEffect(() => {
        if(token) { //si ya inició sesion el usuario, que no muestre la pagina de login, que muestre directamente la pagina de proyecto
            props.history.push("/proyectos")
        }

        if(autenticado) {
            props.history.push("/proyectos")
        }
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)   //si el msj existe, le paso todo el msj al state de alerta
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history])

    //State para inciiar sesion
    const [usuario, guardarUsuario] = useState({
        email: "",
        password: ""
    })

    //extraer
    const {email, password} = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiera iniciar sesion
    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacios
       if(email.trim() === "" || password.trim() === "") {
           mostrarAlerta("Todos los campos son obligatorios", "alerta-error")
           return
       }
        //Pasarlo al action
       iniciarSesion({
           email,
           password
       })
    }

    return ( 
        <div className="form-usuario">
            {alerta //si el state tiene algo
                ?   <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>    //mostrar el msj de error que está en el state con los estilos de la clase que le pasé
                : null 
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar sesion</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"  //tiene que ser el mismo que el de htmlFor
                            name="email"    //tiene que ser igual al campo del state
                            placeholder="Tu email"
                            autoComplete= "off"
                            onChange={onChange}
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"  //tiene que ser el mismo que el de htmlFor
                            name="password"
                            placeholder="Tu contraseña"
                            autoComplete= "off"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Iniciar Sesion"/>
                    </div>
                </form>

                <Link to={"/nueva-cuenta"} className="enlace-cuenta">
                    Crear cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default Login;
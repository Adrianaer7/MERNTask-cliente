import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {token, mensaje, autenticado, registrarUsuario} = authContext

    //En caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
    useEffect(() => {
        if(token) {
            props.history.push("/proyectos")
        }

        if(autenticado) {
            props.history.push("/proyectos")    //una vez que el usuario está autenticado, lo redirijo a proyectos
        }
        
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)   //si el msj existe, le paso todo el msj al state de alerta
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history])

    //State para inciiar sesion
    const [usuario, guardarUsuario] = useState({
        nombre: "",
        email: "",
        password: "",
        confirmar: ""
    })

    //extraer
    const {nombre, email, password, confirmar} = usuario

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    //cuando el usuario quiera crearse la cuenta
    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacios
        if(nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "") {
            mostrarAlerta("Todos los campos son obligatorios", "alerta-error")  //le paso el msj y la clase del index.css
            return
        }

        //Password minimo 6 caracteres
        if(password.length < 6) {
            mostrarAlerta("La contraseña debe ser de al menos 6 caracteres", "alerta-error")
            return

        }

        //Los 2 passwords tienen que ser iguales
        if(password !== confirmar) {
            mostrarAlerta("Las contraseñas no coinciden ", "alerta-error")
            return
        }

        //Pasarlo al action
        registrarUsuario({
            nombre,
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
                <h1>Crear cuenta</h1>

                <form onSubmit={onSubmit}>
                    <div className="campo-form">
                        <label htmlFor="nombre">Usuario</label>
                        <input
                            type="text"
                            id="nombre"  //tiene que ser el mismo que el de htmlFor
                            name="nombre"
                            placeholder="Tu nombre de usuario"
                            onChange={onChange}
                            value={nombre}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"  //tiene que ser el mismo que el de htmlFor
                            name="email"
                            placeholder="Tu email"
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
                            autoComplete="off"
                            onChange={onChange}
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmar"  //tiene que ser el mismo que el de htmlFor
                            name="confirmar"
                            placeholder="Repite la contraseña"
                            autoComplete="off"
                            onChange={onChange}
                            value={confirmar}
                        />
                    </div>

                    <div className="campo-form">
                        <input type="submit" className="btn btn-primario btn-block" value="Registrarme"/>
                    </div>
                </form>

                <Link to={"/"} className="enlace-cuenta">
                    Ya tengo cuenta
                </Link>
            </div>
        </div>
     );
}
 
export default NuevaCuenta;
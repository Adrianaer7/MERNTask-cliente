import React, {useContext, useEffect} from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthContext from '../autenticacion/authContext';

//Gracias a esta funcion, puedo restringir el acceso a la pagina a aquellos que no hayan iniciado sesion
const RutaPrivada = ({component: Component, ...props}) => { //Lo uso en App.js. El ...props quiere decir que toma un componente, en este caso Proyectos

    const authContext = useContext(AuthContext)
    const {autenticado, cargando, usuarioAutenticado} = authContext

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Route {...props} render={props => !autenticado && !cargando    //Router tiene un prop llamado render. El !cargando es para que no me muestre por 1ms la pagina de login al recargar la pagina de proyectos
          ? (
            <Redirect to="/" /> //si no está autenticado, lo mando a la pagina principal
        ) : (
            <Component {...props} />    //sino, lo mandamos al componente
        ) }
        />
    )
}

export default RutaPrivada;
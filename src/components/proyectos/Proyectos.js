import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTareas from '../tareas/FormTareas';
import ListadoTareas from '../tareas/ListadoTareas';

import AuthContext from '../../context/autenticacion/authContext';

const Proyectos = () => {

    //Extraer la info de autenticacion
    const authContext = useContext(AuthContext)
    const {usuario, usuarioAutenticado} = authContext
 
    useEffect(() => {   //permite que al recargar el compontente, en este caso la pagina, el state contenga los datos del usuario autenticado
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(!usuario) return null    //para que no muestre por 1ms la pagina proyectos al recargar la pagina de iniciar

    return ( 
        <div className="contenedor-app">
            <Sidebar/>

            <div className="seccion-principal">
                <Barra/>

                <main>
                    <FormTareas/>

                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>
            </div>
        </div>
     );
}
 
export default Proyectos;
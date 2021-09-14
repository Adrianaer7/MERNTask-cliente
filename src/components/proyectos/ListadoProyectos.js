import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';

import { CSSTransition, TransitionGroup } from 'react-transition-group';    //para las animaciones

import proyectoContext from '../../context/proyectos/proyectoContext';
import AlertaContext from "../../context/alertas/alertaContext"

const ListadoProyectos = () => {

    //extraigo de proyectoContext.Provider en proyectoState
    const proyectosContext = useContext(proyectoContext) 
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext

    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    //obtengo los proyectos cuando carga el componente
    useEffect(() => {
        //si hay un error
        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }

        obtenerProyectos()
        //eslint-disable-next-line
    }, [mensaje])

    //si no hay ningun proyecto creado
    if(proyectos.length === 0) return <p>No hay proyectos. Comienza creando uno.</p>
  

    return ( 
        <ul className="listado-proyectos">
            {alerta 
                ? <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
                : null
            }
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}  //con uuid tengo que poner proyecto.id, con mongo es proyecto._id
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto
                            proyecto={proyecto}
                    />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListadoProyectos;   
import React from "react";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; //elementos necesarios para habilitar el routing

import ProyectoState from "./context/proyectos/proyectoState";
import TareaState from "./context/tareas/tareaState";
import AlertaState from "./context/alertas/alertaState";
import AuthState from "./context/autenticacion/authState";
import RutaPrivada from "./context/rutas/RutaPrivada";


function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>  {/*Todo lo que coloque dentro del switch, van a ser cada una de las paginas. Y todo lo que esté por fuera será lo que está en todas las paginas */}
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} /> {/* RutaPrivada es un componente que toma otro componente. Si el usuario no está registrado, no carga el componente. A esta funcion se lo llama Higher-order-component o Componente de orden superior*/}
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;

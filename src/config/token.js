import clienteAxios from "./axios";

const tokenAuth = token => {    //lo uso en authState y en App.js
    if(token) {
        clienteAxios.defaults.headers.common["x-auth-token"] = token //en caso de que haya token, lo pasamos al header.
    } else {
        delete clienteAxios.defaults.headers.common["x-auth-token"] //sino, lo eliminamos
    }
}

export default tokenAuth;
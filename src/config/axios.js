import axios from "axios"

const clienteAxios = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL  //traigo la variable de entorno creada manualmente en cliente
})

export default clienteAxios;
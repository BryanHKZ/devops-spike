import React, { useReducer } from "react";
import AuthContext from "./authContext";
import { AuthReducer } from "./authReducer";
import tokenAuth from "../../config/tokenAuth";
import clienteAxios from "../../config/axios";

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_CLIENTE,
  AUTH_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    customer: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerCustomer = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/register", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data,
      });
      window.location.href = "/";
    } catch (error) {
      const alerta = {
        msg: error.response.data.msg,
        categoria: "alerta-error ",
      };
      dispatch({
        type: REGISTRO_ERROR,
        payload: alerta,
      });
    }
  };

  const isAuthenticated = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenAuth(token);
    } else {
      dispatch({
        type: AUTH_ERROR,
      });

      window.location.href = "/login";
    }

    try {
      const respuesta = await clienteAxios.get("/auth");

      dispatch({
        type: OBTENER_CLIENTE,
        payload: respuesta.data.customer,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: AUTH_ERROR,
      });
    }
  };

  const iniciarSesion = async (datos, onOk, onError) => {
    try {
      const respuesta = await clienteAxios.post("/login", datos);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data,
      });
      onOk();
    } catch (error) {
      dispatch({
        type: AUTH_ERROR,
      });
      onError(error.response.data.message);
    }
  };

  const closeSession = async () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        customer: state.customer,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registerCustomer,
        iniciarSesion,
        isAuthenticated,
        closeSession,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  OBTENER_CLIENTE,
  AUTH_ERROR,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../types";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_EXITOSO:
    case REGISTRO_EXITOSO:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        autenticado: true,
        customer: action.payload.customer,
        token: action.payload.token,
      };
    case AUTH_ERROR:
    case REGISTRO_ERROR:
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        customer: null,
        autenticado: null,
      };
    case OBTENER_CLIENTE:
      return {
        ...state,
        customer: action.payload,
        autenticado: true,
      };
    default:
      return state;
  }
};

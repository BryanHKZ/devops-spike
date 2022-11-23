import {
  CREAR_PRODUCTO,
  OBTENER_PRODUCTOS,
  EDITAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  ERROR_PRODUCTOS,
} from "../types";

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        productList: action.payload,
      };
    case EDITAR_PRODUCTO:
      return {
        ...state,
        product: action.payload,
      };
    case CREAR_PRODUCTO:
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    case ELIMINAR_PRODUCTO:
      return {
        ...state,
        productList: productList.filter((e) => e.id != action.payload.id),
      };
    case ERROR_PRODUCTOS:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

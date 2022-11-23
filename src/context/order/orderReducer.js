import {
  CREAR_PEDIDO,
  OBTENER_PEDIDOS,
  ERROR_PEDIDOS,
  OBTENER_PEDIDO,
  AGREGAR_PRODUCTOS_PEDIDO,
} from "../types";

export const OrderReducer = (state, action) => {
  switch (action.type) {
    case OBTENER_PEDIDOS:
      return {
        ...state,
        orderList: action.payload,
      };
    case CREAR_PEDIDO:
      return {
        ...state,
        orderList: [...state.orderList, action.payload],
      };
    case OBTENER_PEDIDO:
      return {
        ...state,
        order: action.payload,
      };
    case AGREGAR_PRODUCTOS_PEDIDO:
      return {
        ...state,
        order: {
          ...order,
          products: [...state.order.products, action.payload],
        },
      };
    case ERROR_PEDIDOS:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

import React, { useReducer } from "react";
import OrderContext from "./orderContext";
import { OrderReducer } from "./OrderReducer";
import clienteAxios from "../../config/axios";

import {
  CREAR_PEDIDO,
  OBTENER_PEDIDOS,
  OBTENER_PEDIDO,
  ERROR_PEDIDOS,
  AGREGAR_PRODUCTOS_PEDIDO,
} from "../types";

const OrderState = (props) => {
  const initialState = {
    orderList: [],
    order: null,
    error: null,
    orderLoading: true,
  };

  const [state, dispatch] = useReducer(OrderReducer, initialState);

  const createOrder = async (datos) => {
    try {
      const res = await clienteAxios.post("/order", datos);
      dispatch({
        type: CREAR_PEDIDO,
        payload: res.data,
      });
    } catch (error) {
      const alerta = {
        message: error.response.data.message,
        categoria: "alerta-error ",
      };
      dispatch({
        type: ERROR_PRODUCTOS,
        payload: alerta,
      });
    }
  };

  const getOrders = async (idCustomer) => {
    try {
      if (!idCustomer) idCustomer = "";
      const respuesta = await clienteAxios.get("/order?customer=" + idCustomer);
      dispatch({
        type: OBTENER_PEDIDOS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_PEDIDOS,
      });
    }
  };

  const getOrder = async (idOrder) => {
    try {
      if (!idOrder) idOrder = "";
      const respuesta = await clienteAxios.get("/order/" + idOrder);
      dispatch({
        type: OBTENER_PEDIDO,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_PEDIDOS,
      });
    }
  };

  const addProductToOrder = async (product) => {
    try {
      dispatch({
        type: AGREGAR_PRODUCTOS_PEDIDO,
        payload: {
          idProduct: product.id,
          quantity: product.quantity,
          price: product.price * product.quantity,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orderList: state.orderList,
        order: state.order,
        error: state.error,
        orderLoading: state.orderLoading,
        createOrder,
        getOrders,
        getOrder,
        addProductToOrder,
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};

export default OrderState;

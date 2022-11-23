import React, { useReducer } from "react";
import AuthContext from "./productContext";
import { ProductReducer } from "./productReducer";
import tokenAuth from "../../config/tokenAuth";
import clienteAxios from "../../config/axios";

import {
  CREAR_PRODUCTO,
  OBTENER_PRODUCTOS,
  EDITAR_PRODUCTO,
  ELIMINAR_PRODUCTO,
  ERROR_PRODUCTOS,
} from "../types";

const ProductState = (props) => {
  const initialState = {
    productList: [],
    toDeleteProduct: null,
    product: null,
    error: null,
    productLoading: true,
  };

  const [state, dispatch] = useReducer(ProductReducer, initialState);

  const createProduct = async (datos) => {
    try {
      const res = await clienteAxios.post("/product", datos);
      dispatch({
        type: CREAR_PRODUCTO,
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

  const getProducts = async (name) => {
    try {
      if (!name) name = "";
      const respuesta = await clienteAxios.get("/product?name=" + name);
      dispatch({
        type: OBTENER_PRODUCTOS,
        payload: respuesta.data,
      });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: ERROR_PRODUCTOS,
      });
    }
  };

  const updateProduct = async (id, datos) => {
    try {
      const respuesta = await clienteAxios.put("/product/" + id, datos);
      dispatch({
        type: EDITAR_PRODUCTO,
        payload: respuesta.data,
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

  const removeProduct = async (id) => {
    try {
      const respuesta = await clienteAxios.delete("/product/" + id);
      dispatch({
        type: ELIMINAR_PRODUCTO,
        payload: respuesta.data,
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

  return (
    <AuthContext.Provider
      value={{
        productList: state.productList,
        toDeleteProduct: state.toDeleteProduct,
        product: state.product,
        error: state.error,
        productLoading: state.productLoading,
        createProduct,
        getProducts,
        updateProduct,
        removeProduct,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default ProductState;

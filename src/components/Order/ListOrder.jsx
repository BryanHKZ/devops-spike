import { useState, useContext, useEffect } from "react";
import AxiosClient from "../AxiosClient/AxiosClient";
import Order from "./Order";
import DataClient from "./DataClient";
import Swal from "sweetalert2";
import orderContext from "../../context/order/orderContext";
import authContext from "../../context/auth/authContext";

import { Link } from "react-router-dom";

const ListOrder = () => {
  const { getOrders, order, createOrder } = useContext(orderContext);
  const { customer } = useContext(authContext);
  console.log(customer);
  const { id, name } = customer;
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [registrarOr, setregistrarOr] = useState({
    addressCustomer: address,
    phoneCustomer: phone,
    idCustomer: id,
    products: order.products,
  });
  const { idorder } = registrarOr;
  const register_Order = async () => {
    try {
      await createOrder(registrarOr);
      Swal.fire({
        icon: "success",
        text: "Registro exitoso",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <h2>Gestionemos tu Orden</h2>
          </div>
        </div>
        {control !== "" ? (
          <div className="row justify-content-center mt-5 centrar">
            <form className="col-6 mt-3 mb-5">
              <label>
                <strong>Id Orden</strong>
              </label>
              <input
                className="form-control mb-4 "
                type="number"
                value={idorder}
              />
              <label>
                <strong>Identificación</strong>
              </label>
              <input
                className="form-control mb-4"
                type="number"
                value={identification}
              />
              <label>
                <strong>Nombre</strong>
              </label>
              <input className="form-control mb-4" type="text" value={name} />
              <label>
                <strong>Telefono</strong>
              </label>
              <input
                className="form-control mb-4"
                type="text"
                value={cellPhone}
              />
              <label>
                <strong>Direccion</strong>
              </label>
              <input className="form-control " type="text" value={adress} />
            </form>

            <div className="col-8">
              <table className="table table-responsive">
                {orderCont.length === 0 ? (
                  <div className="col-auto">
                    <h2>No hay Orden a Gestionar</h2>
                  </div>
                ) : (
                  <>
                    <thead>
                      <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Codigo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderCont?.map((product) => (
                        <Order product={product} key={product.codeProduct} />
                      ))}
                    </tbody>
                  </>
                )}
              </table>
              <button
                className="btn btn-success btn-block mx-2 mt-4 mb-5"
                onClick={register_Order}
              >
                Crear Orden
              </button>
              <Link className="btn btn-primary btn-block mx-2 mt-4 mb-5" to="/">
                Volver
              </Link>
            </div>
          </div>
        ) : (
          <DataClient />
        )}
      </div>
    </div>
  );
};

export default ListOrder;

import { useState, useContext } from "react";
import { Button, Modal, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import orderContext from "../../context/order/orderContext";

const Product = ({ product }) => {
  const { addProductToOrder } = useContext(orderContext);
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({
    name: product.name,
    code: product.code,
    price: product.price,
    amount: "",
  });
  const { code, amount } = order;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = (e) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ([code, amount].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    addProductToOrder({
      ...product,
      quantity: amount,
    });
    handleClose();
  };
  return (
    <div className="card col-3 m-lg-2 ">
      <div className="card-body">
        <p className="card-text">Codigo: {product.code}</p>
        <p className="card-text">Nombre: {product.name}</p>
        <p className="card-text"> Precio: {product.price}</p>
      </div>

      <div className="card-footer">
        <Button className="btn-success" onClick={handleShow}>
          Agregar a la Orden
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col xs={12} md={6}>
                  <label className="text-color"> Codigo Producto</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={product.code}
                    name="code"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={6}>
                  <label className="text-color"> Nombre</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="product.name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={6}>
                  <label className="text-color"> Cantidad</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="amount"
                    value={amount}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="success" type="submit">
                Añadir
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Product;

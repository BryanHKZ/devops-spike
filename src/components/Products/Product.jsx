import { useState } from "react";
import { Button, Modal, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import useOrder from "../../hooks/useOrder";

const Product = ({ product }) => {
  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({
    nameProduct:product.nameProduct,
    codeProduct: product.codeProduct,
    price:product.price,
    amount: ""
  });
  const { agregate_order } = useOrder();
  const { codeProduct, amount } = order;
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
    if ([codeProduct, amount].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    agregate_order(order);
    setOrder({
      codeProduct: product.codeProduct,
      amount: "",
    });
    handleClose();
  };
  return (
    <div className="card col-3 m-lg-4 ">
      <div className="card-body">
        <p className="card-text">
          <p>Codigo: {product.codeProduct}</p>
        </p>
        <p className="card-text">
          <p>Nombre: {product.nameProduct}</p>
        </p>
        <p className="card-text">
          {" "}
          <p>Precio: {product.price}</p>
        </p>
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
            <Modal.Title>{product.nameProduct}</Modal.Title>
          </Modal.Header>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <Row>
                <Col xs={12} md={6}>
                  <label className="text-color"> Codigo Producto</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={product.codeProduct}
                    name="codeProduct"
                    onChange={handleChange}
                  />
                </Col>
                <Col xs={6} md={6}>
                  <label className="text-color">  Nombre</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    name="product.nameProduct"
                    value={product.nameProduct}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row>
              <Col xs={6} md={6}>
                  <label className="text-color">  Cantidad</label>
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
}

export default Product

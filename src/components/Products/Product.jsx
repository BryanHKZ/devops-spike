import {useState} from 'react'
import { Button, Modal } from "react-bootstrap";
const Product = ({product}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className="card col-3 m-lg-4 ">
    
    <div className="card-body">
    <p className="card-text"><p>Codigo: {product.codeProduct}</p></p>
      <p className="card-text"><p>Nombre: {product.nameProduct}</p></p>
      <p className="card-text"> <p>Precio: {product.price}</p></p>
    </div>

    <div className="Productall card-footer">
      
         <Button className="btn-success" onClick={handleShow}>
          Ordenar
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
        <form >
        <Modal.Body>  
             <p>{product.nameProduct}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleClose}>
            Agregar al carrito
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </div>
  </div>
  )
}
export default Product;


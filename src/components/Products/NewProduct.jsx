import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import productContext from "../../context/product/productContext";

const NewProduct = () => {
  const { createProduct } = useContext(productContext);
  //state de registro
  const [registerForm, setRegisterForm] = useState({
    code: Math.floor(Math.random() * (99999 - 10000)) + 10000,
    name: "",
    price: "",
    status: "ACTIVE",
  });
  const { code, name, price } = registerForm;

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if ([code, name, price].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    register_Product();
    //reseteamos el form
    setRegisterForm({
      code: Math.floor(Math.random() * (99999 - 10000)) + 10000,
      name: "",
      price: "",
    });
  };

  const register_Product = async () => {
    try {
      await createProduct(registerForm);
      Swal.fire({
        icon: "success",
        text: "Producto creado exitosamente",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <h2 className="title">Añade tus Productos</h2>
          </div>
        </div>
        <form onSubmit={handleSubmitForm}>
          <div className="row justify-content-center ">
            <div className="col-md-7 m-4">
              <label className="mt-2">
                <strong>Codigo</strong>
              </label>
              <input
                name="code"
                className="form-control mb-5 mt-2 "
                type="number"
                value={code}
                onChange={handleChange}
              />
              <input
                name="name"
                className="form-control mb-5"
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={handleChange}
              />
              <input
                name="price"
                className="form-control mb-2 "
                type="number"
                placeholder="Precio"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-7 clearfix">
              <input
                type="submit"
                className="btn btn-primary btn-lg btn-block  "
                value="Agregar"
              />
              <Link
                to="/"
                className=" m-lg-5 btn btn-success btn-lg btn-block "
              >
                Volver
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProduct;

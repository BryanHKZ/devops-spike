import { useState, useEffect } from "react";
import Product from "./Product";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import productContext from "../../context/product/productContext";
import authContext from "../../context/auth/authContext";

export const ListProducts = () => {
  const { getProducts, productList } = useContext(productContext);
  const { autenticado, isAuthenticated } = useContext(authContext);

  const [filterByName, setFilterByName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filterByName === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay campo a buscar",
      });
      return;
    }
    handleSubmitForm();
  };

  useEffect(() => {
    const Search = async () => {
      try {
        isAuthenticated();
        getProducts();
      } catch (error) {
        console.log(error);
      }
    };
    Search();
  }, []);

  const handleSubmitForm = async () => {
    try {
      getProducts(filterByName);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="col-5">
        {autenticado && (
          <Link
            type="submit"
            className="btn btn-primary btn-block mx-5 mt-4"
            to="/new"
          >
            {" "}
            Agregar Producto
          </Link>
        )}
        {autenticado && (
          <Link
            type="submit"
            className="btn btn-success btn-block mx-2 mt-4 "
            to="/order"
          >
            {" "}
            Tu Orden
          </Link>
        )}
        {!autenticado ? (
          <Link
            type="submit"
            className="btn btn-success btn-block mx-2 mt-4"
            to="/login"
          >
            {" "}
            Iniciar Sesión
          </Link>
        ) : (
          <Link
            type="submit"
            className="btn btn-success btn-block mx-2 mt-4"
            to="/login"
          >
            {" "}
            Cerrar Sesión
          </Link>
        )}
      </div>
      <div className="row centrar">
        <div className="col-8">
          <h1 className="text-center mt-4 mb-5">Tus Productos</h1>
        </div>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Que Producto deseas ver?"
              className="form-control mt-3"
              value={filterByName}
              onChange={(e) => {
                setFilterByName(e.target.value);
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-block mt-3 btn-tam"
            >
              {" "}
              Buscar
            </button>
          </form>
        </div>
        {selectedProduct.code ? (
          <div className="row centrar mt-4">
            <Product product={selectedProduct} key={selectedProduct.code} />
            <div className="col-10 centrar">
              <button
                className="btn btn-block btn-primary"
                onClick={() => {
                  setSelectedProduct({});
                }}
              >
                Ver lista
              </button>
            </div>
          </div>
        ) : (
          <div className="row centrar mt-4">
            {productList.map((product) => (
              <Product product={product} key={product.code} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default ListProducts;

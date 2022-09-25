import {useState,useEffect } from "react";
import AxiosClient from "../AxiosClient/AxiosClient";
import Product from "./Product";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { Link } from 'react-router-dom';

export const ListProducts = () => {
  const [Products, setproductList] = useState([]);
  const [search, setSearch] = useState("");

  const handleSubmit = e =>{
    e.preventDefault();
    if(search === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No hay campo a buscar',
      });
      return
    }
    searchProducts();
  }

  useEffect(()=>{
    const Search = async () => {
    try{
        const { data } = await AxiosClient.get('/products');
        setproductList(data.listProducts);
        console.log(data.listProducts);
    }catch(error){
      console.log(error);
    }
  }
  Search();
  },[])
 
  return (
    <><div className="col-5">
    <Link
          type="submit"
          className="btn btn-primary btn-block mx-5 mt-4"
          to="/new"
        > Agregar Producto</Link>
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
            value={search}
            onChange={(e)=>{setSearch(e.target.value)}}
          />
          <button 
            type="submit"
            className="btn btn-primary btn-block mt-3 btn-tam"
          > Buscar</button>
        </form>

      </div>
      <div className="row centrar mt-4">
        {Products.map(product =>(
           <Product product={product} key={product.codeProduct}/>
        ))}
      </div>
    </div>
    </>
  );
};
export default ListProducts
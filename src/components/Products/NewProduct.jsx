import  {useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AxiosClient from '../AxiosClient/AxiosClient';
const NewProduct = ()=> {
    //state de registro
    const [registerP,setregister] = useState({
        codeProduct:Math.floor(Math.random() * (99999 - 10000)) + 10000,
        nameProduct:"",
        price:""
    });
    const {codeProduct,nameProduct,price} = registerP;

    const handleChange = e =>{
        setregister({
            ...registerP,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmitForm = e =>{
        e.preventDefault();
        if([codeProduct,nameProduct,price].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
              });
            return;
        }
       register_Product();
        //reseteamos el form
        setregister({
          codeProduct:Math.floor(Math.random() * (99999 - 10000)) + 10000,
          nameProduct:"",
          price:"",
        });
    }

    const register_Product = async () => {
        try{
        const {data} = await AxiosClient.post('/products',registerP);
        console.log(data);
        Swal.fire({
            icon: 'success',
            text: 'Registro exitoso',
          });
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div>
             <div className='container'>
           <div className="row justify-content-center mt-5">
                <div className="col-auto">
                    <h2 className="title">Añade tus Productos</h2>
                </div>
           </div>
                    <form
                        onSubmit={handleSubmitForm}
                    >
                         <div className="row justify-content-center ">
                            <div className="col-md-7 m-4">
                                <label className="mt-2" ><strong>Codigo</strong></label>
                                <input
                                    name="codeProduct"
                                    className="form-control mb-5 mt-2 "
                                    type="number"
                                    value={codeProduct}
                                    onChange={handleChange}
                                />                    
                                <input
                                    name="nameProduct"
                                    className="form-control mb-5"
                                    type="text"
                                    placeholder="Nombre"
                                    value={nameProduct}
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
                                    <Link to="/" className=" m-lg-5 btn btn-success btn-lg btn-block ">Volver</Link>
                        </div>
                                
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default NewProduct
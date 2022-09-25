import {useState} from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import AxiosClient from '../AxiosClient/AxiosClient';
const Register = ()=> {
    //state de registro
    const [registrarU,setregistrar] = useState({
        identification:"",
        name:"",
        email:"",
        cellPhone:"",
        adress:"",
        password:"Default_password"
    });
    const {name,identification,email,cellPhone,adress} = registrarU;

    const handleChange = e =>{
        setregistrar({
            ...registrarU,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmitForm = e =>{
        e.preventDefault();
        if([name,identification,email,cellPhone,adress].includes('')){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Todos los campos son obligatorios',
              });
            return;
        }
       register_user();
        //reseteamos el form
        setregistrar({
          identification:"",
          name:"",
          email:"",
          cellPhone:"",
          adress:"",
          password:"default_password"
        });
    }

    const register_user = async () => {
        try{
        const {data} = await AxiosClient.post('/register',registrarU);
        console.log(data);
        Swal.fire({
            icon: 'success',
            text: 'Producto Registrado con exitoso',
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
                    <h2 className="title">Registrarse</h2>
                </div>
           </div>
                    <form
                        onSubmit={handleSubmitForm}
                    >
                         <div className="row justify-content-center ">
                            <div className="col-md-7 m-4">
                                <input
                                    name="identification"
                                    className="form-control mb-5 "
                                    type="number"
                                    placeholder="Identificacion"
                                    value={identification}
                                    onChange={handleChange}
                                />                    
                                <input
                                    name="name"
                                    className="form-control "
                                    type="text"
                                    placeholder="Nombre"
                                    value={name}
                                    onChange={handleChange}
                                />
                            </div>       
                            
                            <div className="col-md-7  m-4">
                                    <input
                                        name="email"
                                        className="form-control"
                                        type="email"
                                        placeholder="Email" 
                                        value={email}
                                        onChange={handleChange}
                                    />
                                </div> 
                                <div className="col-md-7  m-4">
                                    <input
                                        name="adress"
                                        className="form-control"
                                        type="text"
                                        placeholder="Direccion"
                                        value={adress}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-7 m-4">
                                <input
                                    name="cellPhone"
                                    className="form-control "
                                    type="number"
                                    placeholder="Telefono"
                                    value={cellPhone}
                                    onChange={handleChange}
                                />
                            </div>  
                                <div className="col-md-7 clearfix">
                                    <input
                                    type="submit"
                                    className="btn btn-primary btn-lg btn-block  "
                                    value="Registrarse"
                                    />
                                    <Link to="/" className=" m-lg-5 btn btn-success btn-lg btn-block ">Volver</Link>
                                </div>
                                
                        </div>
                    </form>
                </div>
        </div>
    )
}

export default Register
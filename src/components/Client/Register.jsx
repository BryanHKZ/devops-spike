import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authContext from "../../context/auth/authContext";
const Register = () => {
  const { registerCustomer } = useContext(authContext);

  //state de registro
  const [registerForm, setRegisterForm] = useState({
    lastName: "",
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const { name, lastName, email, username, password } = registerForm;

  const handleChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    if ([name, lastName, email, username, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    register_user();
  };

  const register_user = async () => {
    try {
      const res = await registerCustomer(registerForm);

      console.log(res);
      Swal.fire({
        icon: "success",
        text: "Cliente registrado correctamente",
      });
      //reseteamos el form
      setRegisterForm({
        lastName: "",
        name: "",
        email: "",
        username: "",
        password: "",
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
            <h2 className="title">Registrarse</h2>
          </div>
        </div>
        <form onSubmit={handleSubmitForm}>
          <div className="row justify-content-center ">
            <div className="col-md-7 m-4">
              <input
                name="name"
                className="form-control "
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-7 m-d">
              <input
                name="lastName"
                className="form-control mb-5 "
                type="text"
                placeholder="Apellido"
                value={lastName}
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
            <div className="col-md-7 m-4">
              <input
                name="username"
                className="form-control "
                type="text"
                placeholder="Nombre de Usuario"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-7 m-4">
              <input
                name="password"
                className="form-control "
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-7 clearfix">
              <input
                type="submit"
                className="btn btn-primary btn-lg btn-block  "
                value="Registrarse"
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

export default Register;

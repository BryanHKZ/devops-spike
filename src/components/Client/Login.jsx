import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import authContext from "../../context/auth/authContext";
const Login = () => {
  const { iniciarSesion, closeSession } = useContext(authContext);

  //state de registro
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginForm;

  useEffect(() => {
    closeSession();
  }, []);

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleOk = () => {
    Swal.fire({
      icon: "success",
      text: "Inicio de Sesión Correcto",
    });
    //reseteamos el form
    setLoginForm({
      email: "",
      password: "",
    });
    window.location.href = "/";
  };

  const handleError = (message) => {
    Swal.fire({
      icon: "error",
      text: message,
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    await iniciarSesion(loginForm, handleOk, handleError);
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-auto">
            <h2 className="title">Iniciar Sesión</h2>
          </div>
        </div>
        <form onSubmit={handleSubmitForm}>
          <div className="row justify-content-center ">
            <div className="col-md-7 m-4">
              <input
                name="email"
                className="form-control "
                type="email"
                placeholder="Correo electrónico"
                value={email}
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
                value="Iniciar Sesión"
              />
              <Link
                to="/register"
                className=" m-lg-5 btn btn-success btn-lg btn-block "
              >
                Registrarme
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

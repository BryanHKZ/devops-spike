import { useEffect } from "react";
import { useState, useContext } from "react";
import authContext from "../../context/auth/authContext";

const DataClient = () => {
  const { isAuthenticated, customer } = useContext(authContext);
  const [email, setEmail] = useState(customer.email);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No hay campo a buscar",
      });
      return;
    }
  };

  useEffect(async () => {
    try {
      await isAuthenticated();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="row centrar">
      <div className="col-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email?"
            className="form-control mt-3"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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
    </div>
  );
};

export default DataClient;

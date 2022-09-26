import {useState} from 'react'
import useOrder from "../../hooks/useOrder";
import AxiosClient from "../AxiosClient/AxiosClient";

const DataClient = () => {
    const [email, setEmail] = useState("");
    const {setControl,setdataClient} =useOrder();
    const handleSubmit = e =>{
        e.preventDefault();
        if(email === ''){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No hay campo a buscar',
          });
          return
        }
        searchClient();
        setEmail("");
      }

      const searchClient = async () => {
        try{
            const { data } = await AxiosClient.post(`/profile`,{email});
            setdataClient(data.Profile);
            setControl(data.Profile.email);
        }catch(error){
          console.log(error);
        }
      }
  return (
    <div className="row centrar">
      <div className="col-8">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email?"
            className="form-control mt-3"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <button 
            type="submit"
            className="btn btn-primary btn-block mt-3 btn-tam"
          > Buscar</button>
        </form>

      </div>
    </div>
  )
}

export default DataClient
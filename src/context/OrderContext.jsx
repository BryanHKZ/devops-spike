import {createContext,useState} from 'react'
const OrderContext = createContext();

const OrderProvider = ({children})=> {

    const [orderCont,setorderContext] = useState([]);
    const [dataClien,setdataClient] = useState({});
    const [control,setControl] = useState(""); 
    const agregate_order = order =>{
        setorderContext([...orderCont,order]);
    }
    return (
        <OrderContext.Provider
            value={{
                orderCont,
                dataClien,
                control,
                agregate_order,
                setdataClient,
                setControl
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export{
    OrderProvider
}

export default OrderContext
import {useContext} from 'react';
import OrderContext from '../context/OrderContext';

const useOrder = ()=>{
    return useContext(OrderContext);
}

export default useOrder;
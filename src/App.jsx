import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ListProducts from './components/Products/ListProducts';
import Register from './components/Client/Register';
import NewProduct from './components/Products/NewProduct';
import ListOrder from './components/Order/ListOrder';
import {OrderProvider} from './context/OrderContext';
function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
            <Routes>
                <Route path="/" element={<ListProducts/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/new" element={<NewProduct/>}></Route>
                <Route path="/order" element={<ListOrder/>}></Route>
            </Routes>
      </OrderProvider>
   </BrowserRouter>
  )
}

export default App

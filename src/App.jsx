import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ListProducts from './components/Products/ListProducts';
import Register from './components/Client/Register';
import NewProduct from './components/Products/NewProduct';
function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<ListProducts/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/new" element={<NewProduct/>}></Route>
            </Routes>
            
   </BrowserRouter>
  )
}

export default App

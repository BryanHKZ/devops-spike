import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListProducts from "./components/Products/ListProducts";
import Register from "./components/Client/Register";
import NewProduct from "./components/Products/NewProduct";
import ListOrder from "./components/Order/ListOrder";
import Login from "./components/Client/Login";

import AuthState from "./context/auth/authState";
import ProductState from "./context/product/productState";
import OrderState from "./context/order/orderState";
function App() {
  return (
    <AuthState>
      <ProductState>
        <OrderState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ListProducts />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/new" element={<NewProduct />}></Route>
              <Route path="/order" element={<ListOrder />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </OrderState>
      </ProductState>
    </AuthState>
  );
}

export default App;

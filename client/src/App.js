// Css
import './App.css';

// Router dom
import { Routes, Route } from 'react-router-dom';

// Components
import Home from "./components/Home";
import ProductCards from './components/ProductCards';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login/Login';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import LandingPage from './components/LandingPage';
import Payment from './components/Payment';
import SuccesBuy from './components/SuccesBuy';
import Profile from './components/Profile';
import PurchaseHistory from './components/PurchaseHistory';
import "./scss/custom.scss"




// Admin
import AdminProductList from "./components/AdminProductList";
import AdminCreateProduct from "./components/AdminCreateProduct";
import AdminOrdersList from "./components/AdminOrdersList";
import AdminOrderDetails from "./components/AdminOrderDetails";
import AdminCustomerHistory from "./components/AdminCustomerHistory";
import AdminUpdateProduct from "./components/AdminUpdateProduct";
import AdminAnswers from "./components/AdminAnswers";



// globalizo la funcion AuthProvider a todos los componentes
import { AuthProvider } from './components/context/authContext';
// ruta protegida
import { ProtectedRouter } from './components/ProtectedRoute/protectedRoute';
import AdminStatistics from './components/AdminStatistics';

import {
  getAllProducts,
  getAllCategories,
} from "./redux/actions";


import { useDispatch } from "react-redux";
import { useEffect } from "react";
import PurchaseDetails from './components/PurchaseDetails';
import UserProducts from './components/UserProducts';
import AdminSetNewAdmin from './components/AdminSetNewAdmin';
import AdminPanelInfo from './components/AdminPanelInfo';
import FailedPayment from './components/FailedPayment';
import Checkout from './components/Checkout';

function App() {


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="App container-fluid p-0 bg1">
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<LandingPage />}></Route>
            <Route path='store' element={<ProductCards />}>
            </Route>
            <Route path='store/:idProduct' element={<ProductDetails />}></Route>
            <Route path='contact' element={<Contact />}></Route>
            <Route path='cart' element={<Cart />}></Route>
            <Route path='payment' element={<Checkout />}>
              <Route index element={<Payment />} ></Route>
              <Route path='successfullPurchase' element={<SuccesBuy />}></Route>
              <Route path='failedPurchase' element={<FailedPayment />}></Route>
            </Route>
            <Route path='adminpanel' element={
              <ProtectedRouter>
                <AdminPanel />
              </ProtectedRouter>
            }>
              <Route index element={<AdminPanelInfo />}></Route>
              <Route path='list-product' element={<AdminProductList />}></Route>
              <Route path='create-product' element={<AdminCreateProduct />}></Route>
              <Route path='admin-statistics' element={<AdminStatistics />}></Route>
              <Route path='order-list' element={<AdminOrdersList />}></Route>
              <Route path='order-details/:idPayment' element={<AdminOrderDetails />}></Route>
              <Route path='customer-history/:idCustomer' element={<AdminCustomerHistory />}></Route>
              <Route path='user-management' element={<AdminSetNewAdmin />}></Route>
              <Route path='list-product/update-product/:idProduct' element={<AdminUpdateProduct />}></Route>
              <Route path='admin-answers' element={<AdminAnswers />}></Route>
            </Route>

            <Route path='login' element={
              <Login />
            }></Route>
            <Route path='signup' element={<SignUp />}></Route>

            <Route path='profile' element={<Profile />}>
              <Route path='purchase-history' element={<PurchaseHistory />}></Route>
              <Route path="purchase-history/order-details/:orderId" element={<PurchaseDetails />}></Route>
              <Route path="my-products" element={<UserProducts />}></Route>
            </Route>

          </Route>
          <Route path='*' element=
            {<h1>There's nothing here!</h1>}
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

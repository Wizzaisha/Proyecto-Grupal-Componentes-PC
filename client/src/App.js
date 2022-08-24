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
// globalizo la funcion AuthProvider a todos los componentes
import {AuthProvider} from './components/context/authContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route index element={<LandingPage />}></Route>
          <Route path='/store' element={<ProductCards />}>

          </Route>
          <Route path='store/:idProduct' element={<ProductDetails />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          <Route path='/payment' element={<Payment />}></Route>

        </Route>
        <Route path='/adminpanel' element={<AdminPanel />}>

        </Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='*' element=
          {<h1>There's nothing here!</h1>}
        ></Route>
      </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

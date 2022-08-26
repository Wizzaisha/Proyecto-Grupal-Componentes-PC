// Css
import './App.css';

// Router dom
import {  BrowserRouter as Router,Routes, Route } from 'react-router-dom';

// Components
import Home from "./components/Home";
import ProductCards from './components/ProductCards';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login/Login';
import SignUp from './components/SignUp';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Protected from './components/Routes/Protected'

 
const App = () => (
  // <Router>
  //   <Header />
    <Routes>
       {/* public routes */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route index element={<ProductCards />}></Route>
          <Route path='contact' element={<Contact />}></Route>
          <Route path=':idProduct' element={<ProductDetails />}></Route>
          <Route path='cart' element={<Cart />}></Route>
          {/* <Route path='*' element= {<h1>There's nothing here!</h1>}></Route> */}
      {/* we want to protect these routes */}
      <Route
        element={<Protected allowedRoles={[process.env.REACT_APP_USER]} />}
      >
        {/* <Route path="/PAGOS" element={<Home />} /> */}

        {/* <Route path="/perfil" element={<Perfil />} /> */}
      </Route>

      
      <Route element={<Protected allowedRoles={[process.env.REACT_APP_ADMIN]} />}>
       <Route path='/adminpanel' element={<AdminPanel />}>  </Route>
        </Route>

    <Route element={<Protected allowedRoles={[process.env.REACT_APP_SUPERADMIN]} />}>
          <Route path='/adminpanel' element={<AdminPanel />}>  </Route>
          {/* <Route path='/SETROLES' element={<SETROLES />} /> */}
        </Route>

        {/* <Route element={<Protected allowedRoles={[process.env.REACT_APP_SUPERADMIN , process.env.REACT_APP_ADMIN]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route> */}

      {/* catch all */}
      <Route path="*" element={<Page404 />} />
    </Routes>
   // </Router>  
);

export default App;

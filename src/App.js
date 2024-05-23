import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import AddToCart from "./pages/AddToCart";
import Order from "./pages/Order";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";


import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
function App() {
  return (
    < >
<Router>
<Navbar/>
{/* <Home/> */}
<Routes>
  <Route exact path="/signup" element={<Signup/>}/>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/explore" element={<Explore/>}/>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/admin" element={<Admin/>}/>
  <Route exact path="/addToCart" element={<AddToCart/>}/>
  <Route exact path="/order" element={<Order/>}/>
  <Route exact path="/resetPassword" element={<ResetPassword/>}/>
  <Route exact path="/paymentSuccess" element={<PaymentSuccess/>}/>
  <Route exact path="/paymentCancel" element={<PaymentCancel/>}/>







</Routes>
</Router>

    </>
  );
}

export default App;

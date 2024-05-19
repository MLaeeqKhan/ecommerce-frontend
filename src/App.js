import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";


import {BrowserRouter as Router, Routes,Route } from 'react-router-dom'
function App() {
  return (
    < >
<Router>
<Navbar/>
<Routes>
  <Route exact path="/signup" element={<Signup/>}/>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/explore" element={<Explore/>}/>
  <Route exact path="/home" element={<Home/>}/>
  <Route exact path="/admin" element={<Admin/>}/>
  <Route exact path="/resetPassword" element={<ResetPassword/>}/>




</Routes>
</Router>

    </>
  );
}

export default App;

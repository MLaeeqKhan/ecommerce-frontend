import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { userData } from "../ReduxToolKit/Slice";
import { useEffect } from "react";

const Navbar = () => {
  const dispatch=useDispatch();
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userdata"));
    if (storedUserData) {
      dispatch(userData(storedUserData));
    }
  }, [dispatch]);
const user = useSelector((state) => {
  return state.users;
});
console.log("Redux data userData NavBar:",user);

const handleLogout=()=>{
  localStorage.removeItem("userdata") ;
  dispatch(userData(''));
} 
  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">TechAppMart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/
          ">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/admin">Admin</Link>
        </li>
        {user && user.token?(<li className="nav-item">
        <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
        </li>):(<><li className="nav-item">
          <Link className="nav-link" to="/signup">Sigup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </>)}
       
        
       
       
      </ul>
      <ul className="navbar-nav">
      <li className="nav-item">
          <Link className="nav-link" to="/order"><i class="bi bi-truck"></i></Link>
        </li>
      <li className="nav-item">
              {user && user.token ? (
                <Link className="nav-link" to="/addToCart"><i className="bi bi-cart-fill"></i></Link>
              ) : (
                <Link className="nav-link" to="/login"><i className="bi bi-cart-fill"></i></Link>
              )}
            </li>

      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
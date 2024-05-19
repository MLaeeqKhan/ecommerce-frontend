
import { useState } from "react";
  import axios from 'axios';
  import {useDispatch} from 'react-redux'
  import { userData } from "../ReduxToolKit/Slice";

  import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Link, useNavigate } from "react-router-dom";
  
  const Login = () => {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
      email: "",
      pass: "",
    });
    let name, value;
    const handleInput = (e) => {
      name = e.target.name;
      value = e.target.value;
      setUser({ ...user, [name]: value });
    };
    const postData = async (e) => {
      e.preventDefault();
      const { email, pass } = user;
      try {
        const res = await axios.post("http://localhost:5000/signin", {
          email,
          pass,
        });
        console.log("UserData Login:",res.data); 
        localStorage.setItem("userdata",JSON.stringify(res.data));
        dispatch(userData(res.data));
        if (res.status===200) {
          console.log("User Login Successfully!");
          toast.success("User Login Successfully!", {
            onClose: () => {
             navigator('/home');
            }
          });
          
          setUser({
            email: "",
            pass: "",
          });
        }


      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log("Please Fill all credentials");
          toast.error("Please Fill all credentials");
        }
        if (error.response && error.response.status === 404) {
          console.log("Please Enter Valid credentials");
          toast.error("Please Enter Valid credentials");
        }
        if (error.response && error.response.status === 500) {
          console.log("Internal Server Error");
          toast.error("Internal Server Error");
        }
        else{
          console.error("Error:", error);

        }
      }
    }
  
    return (
      <>
          <ToastContainer />

        <section className="signup-section">
          <div className="inner-signup-section">
            <div className="form">
              <form>
               
              <div className="input">
                <p>Email</p>

                <input
                  type="email"
                  onChange={handleInput}
                  name="email"
                  value={user.email}
                />
              </div>
              <div className="input">
                <p>Password</p>
                <input
                  type="password"
                  onChange={handleInput}
                  name="pass"
                  value={user.pass}
                />
              </div>

               
                <button className="login-btn" onClick={postData} type="submit">
                  Login
                </button>

                <Link className="resetPassword" to="/resetPassword">Forgot Password</Link>
  
  
              </form>
            </div>
          </div>
        </section>
  
      </>
    )
  }

export default Login
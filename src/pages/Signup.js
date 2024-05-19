import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';




const Signup = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    pass: "",
    cPass: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { userName, email, pass, cPass } = user;
    try {
      const res = await axios.post("http://localhost:5000/signup", {
        userName,
        email,
        pass,
        cPass
      });
      if (res.status === 200) {
        console.log("User Signup Successfully!");
        toast.success("User Signup Successfully!", {
          onClose: () => {
            navigator('/login');
          }
        });

        setUser({
          userName: "",
          email: "",
          pass: "",
          cPass: ""
        });
      }
    } catch (error) {

      if (error.response && error.response.status === 400) {
        console.log("Please Fill all credentials");
        toast.error("Please Fill all credentials");
      }
      if (error.response && error.response.status === 409) {
        console.log("Email Already Exists!");
        toast.error("Email Already Exists!");

      }
      if (error.response && error.response.status === 401) {
        console.log("Password Don't Match!");
        toast.error("Password Don't Match!");
      }
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
        toast.error("Internal Server Error");
      }
      else {
        console.error("Error:", error);
      }
      console.error("Error:", error);
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
                <p for="name">UserName</p>

                <input
                  id="name"
                  type="text"
                  onChange={handleInput}
                  name="userName"
                  value={user.userName}
                />
              </div>

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

              <div className="input">
                <p>ConfirmPassword </p>
                <input
                  type="password"
                  onChange={handleInput}
                  name="cPass"
                  value={user.cPass}
                />
              </div>

              <button className="signup-btn" onClick={postData} type="submit">
                SignUp
              </button>


            </form>
          </div>
        </div>
      </section>

    </>
  )
}

export default Signup
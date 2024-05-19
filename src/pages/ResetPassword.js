import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigator = useNavigate();
    const [user, setUser] = useState({
        email: "",
    });
    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };
    const postData = async (e) => {
        e.preventDefault();
        const { email } = user;
        try {
            const res = await axios.post("http://localhost:5000/forgot-password", {
                email,
            });
            console.log("UserData:", res.data);
            if (res.status === 200) {
                console.log("User Reset Password Link Send Successfully!");
                toast.success("User Reset Password Link Send Successfully!", {
                    onClose: () => {
                        navigator('/login');
                    }
                });

                setUser({
                    email: "",
                });
            }
            if(res.status === 405){
                toast.error("Error in Link Sending!");
            }


        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("Please Enter Valid Email!");
                toast.error("Please Enter Valid Email!");
            }
            if (error.response && error.response.status === 405) {
                console.log("Please Enter Valid Email!");
                toast.error("Error in Link Sending!");            }

                if (error.response && error.response.status === 500) {
                    console.log("Internal Server Error");
                    toast.error("Internal Server Error");
                }
                else {
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



                            <button className="login-btn" onClick={postData} type="submit">
                                Submit
                            </button>


                        </form>
                    </div>
                </div>
            </section>

        </>
    )
}

export default ResetPassword
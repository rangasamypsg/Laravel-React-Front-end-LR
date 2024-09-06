import React, { useState } from "react";
import axios from "axios"; 
import './LoginForm.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

function LoginForm() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        password : "",
    });
    
    const [error, setError] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit= async(e)=>{
        e.preventDefault(); 
        console.log(formData);
        try {
            const response = await axios.post("http://localhost:8000/api/login", formData);
            
            const token = response.data.data.token;

            localStorage.setItem("token", token);

            Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
            }).then(() => {
                navigate("/dashboard");
            });
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: "Invalid email or password. Please try again.",
                });
            } else {
                const responseData = error.response.data;
            
                if (responseData.errors && Object.keys(responseData.errors).length > 0) {
                    // Check if errors exist and are not empty
                    setError(responseData.errors);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: responseData.message || "Login failed.",
                    });
                }
            }
        }
    }

  return (
    <div className='wrapper'>
        <form method="post" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" name="email" id="email" placeholder="Enter a email" onChange={handleChange}/>
                <FaUserAlt className='icon'/>
                {error.email && (
                    <span className="text-danger">
                        {error.email[0]}
                    </span>
                )}
            </div>
            <div className="input-box">
                <input type="password" name="password" id="password" placeholder="Enter a Password" onChange={handleChange}/>
                <FaLock className='icon'/>
                {error.password && (
                    <span className="text-danger">
                        {error.password[0]}
                    </span>
                )}
            </div>
            <div className="remember-forgot mt-3">
                <label><input type="checkbox" />Remember me</label>
                <a href="#">Forgot password?</a>
            </div>
            <button type='submit'>Login</button>
            <div className="register-link">
                <p>Don't have an account ? <a href="/register">Register</a></p>
            </div>
        </form>
    </div>
  )
}

export default LoginForm
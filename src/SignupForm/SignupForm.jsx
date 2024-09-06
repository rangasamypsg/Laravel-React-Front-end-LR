import React, { useState } from "react";
import './SignupForm.css'
import Swal from "sweetalert2";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

const SignupForm = () => {

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({});

    const handleChange = (e) => {
        console.log(e.target.name,e.target.value );
        setFormData({...formdata, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata);

        try{
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formdata),
            });

            const responseData = await response.json();
            if (response.ok) {
                setError({});
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message,
                }).then(() => {
                    window.location.href = "/login";
                });
            } else {
                console.log(responseData);
                setError(responseData.errors);
                if (responseData) {
                    setError(responseData.errors);
                } else {
                    Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: responseData || "Registration failed.",
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred during registration.",
            });
        }


    }   

  return (
    <div className='wrapper'>
        <form method="post" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="input-box">
                <input type="text" id="name" name="name" placeholder="Enter Name" onChange={handleChange}/>
                <FaUserAlt className='icon'/>
                {error.name && (
                    <span className="text-danger">
                        {error.name[0]}
                    </span>
                )}
            </div>
            
            <div className="input-box">
                <input type="text" id="email" name="email" placeholder="Enter Email" onChange={handleChange}/>
                <FaUserAlt className='icon'/>
                {error.name && (
                    <span className="text-danger">
                        {error.email[0]}
                    </span>
                )}
            </div>
            <div className="input-box">
                <input type="password" id="password" name="password" placeholder="Password" onChange={handleChange}/>
                <FaLock className='icon'/>
                {error.name && (
                    <span className="text-danger">
                        {error.password[0]}
                    </span>
                )}
            </div>
             
            <button type='submit'>Register</button>
            <div className="register-link">
                <p>Already have an account ? <a href="/login">Login</a></p>
            </div>
        </form>
    </div>
  )
}

export default SignupForm
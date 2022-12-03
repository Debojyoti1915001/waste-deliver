import React, { useState } from 'react';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate =useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/login",{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
           });

           const data = await res.json();

           if(res.status === 400 || !data){
             window.alert("Invalid Credentials");
           }else {
            navigate("/home")
           }

    }


  return (
    <>
        <div className="login-page">
            <div className="login-left">
                <div className="login-logo">
                    <img src="./images/Main-logo.png" alt="" />
                </div>
                <div className="login-main">
                            <h1>Login to your Account</h1>
                            <p>See what is going on with your business</p>
                </div>
                <div>
                    <button className='googlebtn'>
                        <img src="./images/googlelogo.png" alt="" />
                        <span>Continue with Gmail</span>
                    </button>
                </div>
                <div className="or">
                    <p>------------- or Sign in with Email ------------- </p>
                </div>
                <form method='POST'>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input placeholder='mail@abc.com' type="email" className='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input placeholder='************' type="password" className='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="container-checkbox">
                               <div className='remember '>
                                    <input type="checkbox" />
                                    <p>Remember Me</p>
                               </div>
                                <div className="forget">
                                    <p>Forgot Password?</p>
                                </div>
                            </div>
                            <input type="submit" className='loginbtn' value="Login" onClick={loginUser} />
                            <div className="register">
                                <p>Not Registered Yet?</p>
                                <li><NavLink to="/signup">Create an account</NavLink></li>
                            </div>
                </form>
            </div>
            <div className="login-right">
                <img src="./images/Group.png" alt="" />
            </div>
        </div>
    </>
  )
}

export default Login
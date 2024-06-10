import React from 'react';
import './LoginSignup.css';
import { useState } from 'react';

//import user_icon from '../Assets'
const LoginSignup = () => {

    const [action,setAction] = useState("Login");

    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>

            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Username" />
                </div>}
                
                <div className="input">
                     <i className="fas fa-envolope"></i>
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input">
                    <i className="fas fa-lock"></i>
                    <input type="password" placeholder="Password" />
                </div>
            </div>
            {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password <span>Click Here</span></div>}
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}}> Sign Up </div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}}> Login </div>
            </div>         
        </div>
    )
}

export default LoginSignup
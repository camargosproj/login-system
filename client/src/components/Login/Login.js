import authService from "../../services/auth";
import Button from "../Button/Button";
import "./Login.css";
import React, { useState } from "react";

const Login = () => {
    const [register, isRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

 

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await authService.login(username,password);
            console.log(response);
            if (response.status === 200){
                alert("Login successful!");
            }
            else{
                alert("Login failed!");
            }
        }catch(e){
            console.log(e);
        }
      }
    const handleRegister = async (e) => {
        e.preventDefault();
        if (register) {
            try{
                if (username.length > 0 && password.length > 0){
                    const response = await authService.register(username, password);
                    if (response.status === 200){
                        alert("Register successful!");
                    }
                    else{
                        alert("Register failed!");
                    }
                }
                  
            }catch(e){
                console.log(e);
            }
        }else{
            alert("Please fill all fields!");
        }
        
    }
    return ( 
        <div className="login-container">
            <div className="right-container">
                <h1>Welcome</h1>
                {!register ? <p>Login now to get new info!</p> : <p>Register now to get new info!</p>}
                <span>OR</span>
                <div className="button-container register-btn">                    
                    <button onClick={handleRegister} type="submit"><i className="fa-solid fa-circle-user"></i>Register</button>
                </div>
            </div>
            <form className="form-container">
                {!register ? <h3>Login</h3> : <h3>Register</h3>}
                <div className="input-container">
                    <i className="fa-solid fa-user"></i>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <i className="fa-solid fa-key"></i>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                    />
                </div>
                <div className="button-container login-btn">                    
                    <button onClick={handleLogin} type="submit"><i className="fa-solid fa-paper-plane"></i>Login</button>
                </div> 
            </form>
        </div>
    );
}
 
export default Login;
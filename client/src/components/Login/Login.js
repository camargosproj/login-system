import authService from "../../services/auth";
import "./Login.css";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const Login = () => {
    const [registerLayout, setRegisterLayout] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    // Change title
    document.title = "Login";  


    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await authService.login(username,password);
            if (response.status === 200){
                alert("Login successful!");
                navigate("/home");
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
            try{
                if (username.length > 0 && password.length > 0){
                    const response = await authService.register(username, password);
                    if (response.status === 200){
                        alert("Register successful!");
                    }
                    else{
                        alert("Register failed!");
                    }
                }else{
                    alert("Please enter username and password!");
                }
                  
            }catch(e){
                alert(e.response.data);
            }
    }

    return ( 
        <div className="login-container">
            <div className="right-container">
                <h1>Welcome</h1>
                {!registerLayout ? <p>Login now to get new info!</p> : <p>Create your account in no time!</p>}
                <span>OR</span>
                {/* The way i found to render this, might be a little bit tricky, but it works! I'll try another way to do it differently */}
                {!registerLayout
                ?   (<div className="button-container register-btn">                    
                        <button onClick={() => { setRegisterLayout(!registerLayout)}} type="submit"><i className="fa-solid fa-circle-user"></i>Register</button>
                    </div>) : 
                    (<div className="button-container register-btn">                    
                        <button onClick={() => { setRegisterLayout(!registerLayout)}} type="submit"><i className="fa-solid fa-paper-plane"></i>Login</button>
                    </div> )}
            </div>
            <form className="form-container">
                {!registerLayout ? <h3>Login</h3> : <h3>Register</h3>}
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
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}                        
                    />
                    <div onClick={() => setShowPassword(!showPassword)} className="show-password-container">
                        <i className={showPassword ? 'fa-regular fa-eye-slash show-password' : 'fa-regular fa-eye show-password'}></i>
                    </div>
                </div>
                {!registerLayout ?
                (
                    <div className="button-container login-btn">                    
                        <button onClick={handleLogin} type="submit"><i className="fa-solid fa-paper-plane"></i>Login</button>
                    </div> 
                ) : (
                    <div className="button-container login-btn">                    
                        <button onClick={handleRegister} type="submit"><i className="fa-solid fa-paper-plane"></i>Register</button>
                    </div>
                )}
                
            </form>
        </div>
    );
}
 
export default Login;
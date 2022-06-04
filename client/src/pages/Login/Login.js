import authService from "../../services/auth";
import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import Modal from "../../components/Modal/Modal";
import "./Login.css";

const Login = () => {
    const [registerLayout, setRegisterLayout] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    
    // Change title
    document.title = "Login";  

    const handleLoading = async () => {
        try{
            const user = authService.getAuthUser();
            if(user) {
                const validation = await authService.checkLogin(user.token);
                if(validation.status === 200) {
                    navigate("/home");
                }
            }
        }catch(err){
            authService.logout();
        }
    }

    useEffect(() => {
        handleLoading();
    }, []);

    const handleLogin = async(e) => {
        e.preventDefault();
        try{
            const response = await authService.login(username,password);
            if (response.status === 200){
                navigate("/home");
            }
            else{
                setShowModal(true);
                setErrorMessage("Login failed!");
            }
        }catch(e){
            setShowModal(true);
            setErrorMessage(e.response.data.message);
        }
      }
    const handleRegister = async (e) => {
        e.preventDefault();
            try{
                if (username.length > 0 && password.length > 0){
                    const response = await authService.register(username, password);
                    if (response.status === 200){
                        navigate("/home");
                    }
                    else{
                        setErrorMessage("Register failed!");
                    }
                }else{
                    setShowModal(true);
                    setErrorMessage("Please enter username and password!");
                }
                  
            }catch(e){
                setShowModal(true);
                setErrorMessage(e.response.data.message);
            }
    }

    return ( 
        <div className="login-page">
        {showModal && <Modal errorMessage={errorMessage}/>}
        <div className="login-container">
        <div className="login-wrapper">
            <div className="right-container">
                <h1>Welcome</h1>
                {!registerLayout ? <p>Login now to get new info!</p> : <p>Create your account in no time!</p>}
                <span>OR</span>
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
                        <button onClick={handleRegister} type="submit"><i className="fa-solid fa-circle-user"></i>Register</button>
                    </div>
                )}
                
            </form>
        </div>              
        </div>
        </div>
    );
}
 
export default Login;
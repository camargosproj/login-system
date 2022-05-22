import "./App.css";
import Login from "./components/Login/Login";
import authService from "./services/auth";

function App() {

  const handleRegister = async() => {
    const response = await authService.register("mateus", "test");
  }
  const handleLogin = async() => {
    const response = await authService.login("mateus", "test");
    console.log(response);
  }


  return (
    <div className="App">
      <div className="container">
        <Login/>    
      </div>

    </div>
  );
}

export default App;
/*  <div className="login-container">
            <div className="right-container">
                <h1>Welcome</h1>
                {!register ? <p>Login now to get new info!</p> : <p>Register now to get new info!</p>}
                <span>OR</span>
                <Button onClick={handleRegister} register={!register}/>
            </div>
            <form className="form-container">
                {!register ? <h3>Login</h3> : <h3>Register</h3>}
                <div className="input-container">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" name="username" placeholder="Username"/>
                </div>
                <div className="input-container">
                    <i className="fa-solid fa-key"></i>
                    <input type="password" name="password" placeholder="Password"/>
                </div>
                <Button onClick={handleRegister} register={register}/>
            </form>
        </div> */
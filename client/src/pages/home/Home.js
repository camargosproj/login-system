import authService from "../../services/auth";
import {useNavigate} from "react-router-dom"
import "./Home.css";


const Home = () => {
    const navigate = useNavigate();

    const checkTokenState = () => {
        const user = authService.getAuthUser();
        if(user) {
            authService.checkLogin(user.token)
                .then(response => {
                    if(response.status === 200) {
                        alert("User is logged in");
                    }
                    else {
                        authService.logout();
                        alert("User uthorized")
                    }
                })
                .catch(error => {
                    authService.logout();
                    alert("User unauthorized")
                })
        }else{
            navigate("/");
        }
    }

    const logout = () => {
        authService.logout();
        navigate("/");
    }

    return ( 
    <div className="home-container">
        <h4>You logged in successfully!</h4>
        <div className="button-container login-btn">                    
            <button onClick={checkTokenState} type="submit">Verify Token</button>
        </div>
        <div className="button-container login-btn">                    
            <button onClick={logout} type="submit">Logout</button>
        </div>
    </div>
    );

}
 
export default Home;
import authService from "../../services/auth";
import {useNavigate} from "react-router-dom"
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {

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
        <nav className="navbar-container">
            <div className="nav-wrapper">
                <div className="logo">LOGO</div>
                <ul className="nav-list">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                    <li>                    
                        <button className="btn" onClick={checkTokenState} type="submit">Verify Token</button>
                    </li>
                    <li>                    
                        <button className="btn" onClick={logout} type="submit">Logout</button>
                    </li>
                </ul>
            </div>

        </nav>
     );
}
 
export default NavBar;
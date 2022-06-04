import authService from "../../services/auth";
import { Navigate,Outlet} from "react-router-dom";
import NavBar from "../Navbar/NavBar";


const ProtectRoute = ({children,redirectpath }) => {
    const userData = authService.getAuthUser();
    if(!userData) {
        return <Navigate to={redirectpath} replace/>;
    }
    return (
        <>
            <NavBar/>
            {children ? children : <Outlet />}
        </>
    );    
}
 
export default ProtectRoute;
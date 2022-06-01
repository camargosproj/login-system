import authService from "../../services/auth";
import { Navigate,Outlet} from "react-router-dom";

const ProtectRoute = ({children,redirectpath }) => {
    const userData = authService.getAuthUser();
    if(!userData) {
        return <Navigate to={redirectpath} replace/>;
    }
    return children ? children : <Outlet />;    
}
 
export default ProtectRoute;
import authService from "../../services/auth";
import { Navigate} from "react-router-dom";

const ProtectRoute = ({children,redirectpath }) => {
    const userData = authService.getAuthUser();
    console.log(userData);
    if(!userData) {
        return <Navigate to={redirectpath} replace/>;
    }
    return children;
    
}
 
export default ProtectRoute;
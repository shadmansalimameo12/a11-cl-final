

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';



const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation(); 

    
    if (loading) {

        return (

            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>

        );
    }



   
    if (user) {

        return children;

    }

   
    return <Navigate to="/signin" state={{ from: location }} replace />;
};

export default PrivateRoute;
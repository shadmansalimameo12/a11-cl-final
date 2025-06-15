import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { FaGoogle } from 'react-icons/fa';



const SocialLogin = () => {

  
    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();



    
    const from = location.state?.from?.pathname || "/";

    
    
    const handleGoogleSignIn = () => {


        signInWithGoogle()

            .then(() => {

                Swal.fire('Success!', 'Logged in with Google successfully.', 'success');
                navigate(from, { replace: true }); 

            })

            .catch(err => {

                console.error('Google sign-in error:', err);
                Swal.fire('Error', 'Could not sign in with Google.', 'error');

            });



    };



    return (

        <div>

            <div className="divider">or continue with</div>
            <div className="flex justify-center">
                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-neutral">
                    <FaGoogle />
                    Google
                </button>
            </div>
            
        </div>
    );
};

export default SocialLogin;
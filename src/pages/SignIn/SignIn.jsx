import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../shared/SocialLogin';
import Lottie from 'lottie-react';
import signInLottie from '../../assets/lotties/SignIn.json';

const SignIn = () => {
    


    const { signInUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();



  
    const from = location.state?.from?.pathname || '/';



 
    const handleSignIn = (e) => {

        e.preventDefault();        
        const form = new FormData(e.currentTarget);
        const email = form.get('email');
        const password = form.get('password');



        
        signInUser(email, password)

            .then(() => {

                Swal.fire('Signed In!', 'You have successfully logged in.', 'success');


                //redirect kore desired page e jabe
                navigate(from, { replace: true }); 

            })

            .catch((err) => {

                console.error('Sign-in error:', err);
                Swal.fire('Error', 'Invalid email or password.', 'error');


            });
    };


    return (


        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">
                
               <div className="text-center lg:text-left">
                    <Lottie style={{ width: '400px' }} animationData={signInLottie} loop={true} />
                </div>


                <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">

                    <form onSubmit={handleSignIn} className="card-body">


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required />
                        </div>



                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="******" className="input input-bordered" required />
                        </div>




                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </div>

                        <p className="text-center text-sm mt-4">
                            New to AthleticHub? <Link to="/register" className="link link-primary">Create an Account</Link>
                        </p>
                        

                        {/* Social login  */}
                        <SocialLogin />


                    </form>
                </div>

            </div>
        </div>
    );
};

export default SignIn;
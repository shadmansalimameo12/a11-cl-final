import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../shared/SocialLogin';
import Lottie from 'lottie-react';
import registerLottie from '../../assets/lotties/Register.json';



const Register = () => {

   
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();




    
    const handleRegister = (e) => {
        e.preventDefault();
        

        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const photoURL = form.get('photoURL');
        const password = form.get('password');


        
        if (password.length < 6) {

            Swal.fire('Error', 'Password must be at least 6 characters long.', 'error');
            return;

        }



        
        if (!/[A-Z]/.test(password)) {
            Swal.fire('Error', 'Password must contain at least one uppercase letter.', 'error');
            return;
        }




       
        if (!/[a-z]/.test(password)) {

            Swal.fire('Error', 'Password must contain at least one lowercase letter.', 'error');
            return;

        }




        
        createUser(email, password)
            .then(() => {
                
                updateUserProfile(name, photoURL)

                    .then(() => {

                        Swal.fire('Success!', 'Your account has been created.', 'success');
                        navigate('/'); 

                    })

                    .catch(err => {

                        console.error('Profile update error:', err);
                        Swal.fire('Warning', 'Account created, but could not update profile.', 'warning');

                    });
            })

            .catch((err) => {

                console.error('Registration error:', err);
                Swal.fire('Error', err.message, 'error'); 

            });

    };





    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse gap-12">


                <div className="text-center lg:text-left">
                    <Lottie style={{ width: '' }} animationData={registerLottie} loop={true} />
                </div>

                
                <div className="card w-full max-w-sm shrink-0 shadow-2xl bg-base-100">

                    <form onSubmit={handleRegister} className="card-body">
                        
                        <div className="form-control">

                            <label className="label"><span className="label-text">Name</span></label>
                            <input type="text" name="name" placeholder="Your Name" className="input input-bordered" required />

                        </div>
                        


                        <div className="form-control">

                            <label className="label"><span className="label-text">Photo URL</span></label>
                            <input type="url" name="photoURL" placeholder="" className="input input-bordered" required />
                        </div>
                        




                        <div className="form-control">

                            <label className="label"><span className="label-text">Email</span></label>
                            <input type="email" name="email" placeholder="email@example.com" className="input input-bordered" required />
                        </div>

                        <div className="form-control">

                            <label className="label"><span className="label-text">Password</span></label>
                            <input type="password" name="password" placeholder="******" className="input input-bordered" required />

                        </div>
                        




                        <div className="form-control mt-6">

                            <button type="submit" className="btn btn-primary">Register</button>


                        </div>
                        



                        <p className="text-center text-sm mt-4">

                            Already have an account? <Link to="/signin" className="link link-primary">Sign In</Link>
                        </p>
                         

                         <SocialLogin />


                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
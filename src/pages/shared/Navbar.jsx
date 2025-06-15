import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';



const Navbar = () => {


    const { user, signOutUser } = useAuth();



   
    const handleSignOut = () => {

        signOutUser()

            .then(() => {

                Swal.fire('Signed Out', 'You have been logged out.', 'info');
            })


            .catch(err => {


                console.error("Sign out error:", err);
                Swal.fire('Error', 'Could not sign you out.', 'error');



            });

    };




   
    const navLinks = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/events">Events</NavLink></li>
            
            {/* login thakle conditionally render hbe */}
            {user && (
                <>
                    <li><NavLink to="/create-event">Create Event</NavLink></li>
                    <li><NavLink to="/my-bookings">My Bookings</NavLink></li>
                    <li><NavLink to="/manage-events">Manage Events</NavLink></li>
                </>
            )}
        </>

    );




    return (


        <header className="navbar bg-base-100 shadow-md px-4 sticky top-0 z-50">

            <div className="navbar-start">

                {/* mobile dropdown */}
                <div className="dropdown">

                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>

                    

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>


                </div>




                {/* Website Logo/Name */}
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary">
                    AthleticHub
                </Link>

            </div>





            {/* Desktop navigation menu */}
            <div className="navbar-center hidden lg:flex">

                <ul className="menu menu-horizontal px-1 space-x-2">
                    {navLinks}
                </ul>


            </div>
            


            <div className="navbar-end">
                
                {user ? (
                   
                    <div className="dropdown dropdown-end">

                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">



                            <motion.div whileHover={{ scale: 1.15 }} className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img
                                    alt="User Profile"
                                    src={user.photoURL} 
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://i.ibb.co/tq1Pedc/user-avatar.png'; }}
                                />
                            </motion.div>




                        </label>




                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                            <li className="p-2 font-bold">{user.displayName || 'User'}</li>
                            <li><button onClick={handleSignOut} className="btn btn-ghost justify-start">Logout</button></li>

                        </ul>



                    </div>


                ) : (
                    
                    <div className="space-x-2">

                        <Link className="btn btn-sm btn-outline" to="/register">Register</Link>
                        <Link className="btn btn-sm btn-primary" to="/signin">Sign In</Link>

                    </div>
                )}

                
            </div>
        </header>
    );
};

export default Navbar;
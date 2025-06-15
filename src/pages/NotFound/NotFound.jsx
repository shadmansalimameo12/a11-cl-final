


import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';



const NotFound = () => {

    
    useEffect(() => {
        document.title = 'AthleticHub | 404 Not Found';
    }, []);


    return (

        <div className="min-h-screen flex items-center justify-center bg-base-200 text-center px-4">
           

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >

                <h1 className="text-8xl font-bold text-primary">404</h1>
                <h2 className="text-4xl font-semibold mt-4">Page Not Found</h2>
                <p className="mt-4 text-lg">Sorry, we couldn't find the page you're looking for.</p>
                
                
                <Link to="/" className="btn btn-primary mt-8">
                    Go Back to Home
                </Link>


            </motion.div>
            
        </div>
    );
};

export default NotFound;
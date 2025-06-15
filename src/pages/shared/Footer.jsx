import { FaFacebook, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Footer = () => {

    return (

        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">

            
            
            <nav className="grid grid-flow-col gap-4">

                
                <Link to="/about" className="link link-hover">About us</Link>
                <Link to="/contact" className="link link-hover">Contact</Link>
                <Link to="/jobs" className="link link-hover">Jobs</Link>


            </nav> 



            
            {/* Social media links */}

            <nav>
                <div className="grid grid-flow-col gap-4">
                   
                    <a href="https://twitter.com"  className="link link-hover">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://youtube.com" className="link link-hover">
                        <FaYoutube size={24} />
                    </a>
                    <a href="https://facebook.com" className="link link-hover">
                        <FaFacebook size={24} />
                    </a>
                </div>
            </nav> 



            
           
            <aside>

                <p>Copyright © {new Date().getFullYear()} - All right reserved by AthleticHub Inc.</p>

            </aside>

        </footer>
    );
};

export default Footer;
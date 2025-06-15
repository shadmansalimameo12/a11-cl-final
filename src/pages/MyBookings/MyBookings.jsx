import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { FaTable, FaThLarge } from 'react-icons/fa'; 



const MyBookings = () => {

    const { user } = useAuth(); 
    const [bookings, setBookings] = useState([]);
    const [viewMode, setViewMode] = useState('card'); 
    const [loading, setLoading] = useState(true);



    
    
    useEffect(() => {

        document.title = 'AthleticHub | My Bookings';

    }, []);

    


 
    useEffect(() => {

       
        if (user?.email) {



            axios.get(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`, { withCredentials: true })
                .then(res => {

                    if (Array.isArray(res.data)) {
                        setBookings(res.data);
                    }

                })

                .catch(() => {

                    Swal.fire('Error', 'Failed to load your bookings.', 'error');
                })


                .finally(() => {
                    setLoading(false);
                });



        } else {
            
            setLoading(false);

        }
    }, [user]); 

    


    
    const handleCancelBooking = (id) => {
       

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to cancel this booking?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, cancel it!',
            cancelButtonText: 'No, keep it'

        }).then((result) => {

            if (result.isConfirmed) {

                
                axios.delete(`${import.meta.env.VITE_API_URL}/bookings/${id}`, { withCredentials: true })
                    .then(() => {
                     
                        const remainingBookings = bookings.filter(b => b._id !== id);
                        setBookings(remainingBookings);
                        Swal.fire('Canceled!', 'Your booking has been canceled.', 'success');

                    })
                    .catch(() => {
                        Swal.fire('Error', 'Failed to cancel the booking.', 'error');
                    });
            }



        });
    };
    


    
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }



    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">My Bookings</h2>
                
                {/* view mode */}

                <div className="btn-group">

                    <button className={`btn ${viewMode === 'card' ? 'btn-active' : ''}`} onClick={() => setViewMode('card')}><FaThLarge/></button>
                    <button className={`btn ${viewMode === 'table' ? 'btn-active' : ''}`} onClick={() => setViewMode('table')}><FaTable/></button>

                </div>

            </div>




            {bookings.length === 0 ? (

                
                <div className="text-center py-12">

                    <p className="text-xl">You have no upcoming bookings.</p>
                    <Link to="/events" className="btn btn-primary mt-4">Explore Events</Link>

                </div>

            ) : viewMode === 'card' ? (

                // Card View for bookings
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {bookings.map(booking => (

                        <motion.div key={booking._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card bg-base-100 shadow-lg">
                            <div className="card-body">

                                <h3 className="card-title">{booking.eventName}</h3>
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Location:</strong> {booking.location || 'TBD'}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-error btn-sm">Cancel Booking</button>
                                </div>


                            </div>
                        </motion.div>


                    ))}

                </div>

            ) : (


                // Table View for bookings
                <div className="overflow-x-auto">

                    <table className="table w-full">

                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>


                        <tbody>

                            {bookings.map(booking => (

                                <tr key={booking._id} className="hover">

                                    <td>{booking.eventName}</td>
                                    <td>{booking.date}</td>
                                    <td>{booking.location || 'TBD'}</td>
                                    <td className="text-right">
                                        <button onClick={() => handleCancelBooking(booking._id)} className="btn btn-error btn-sm">Cancel</button>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                    
                </div>
            )}
        </div>
    );
};

export default MyBookings;
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';





const EventDetails = () => {

    const { id } = useParams(); 
    const { user, loading: authLoading } = useAuth();

    const navigate = useNavigate();
    

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);



    
    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_URL}/events/${id}`)
            .then(res => {

                setEvent(res.data);
                document.title = `AthleticHub | ${res.data.eventName || 'Event Details'}`;

            })

            .catch(() => {

                Swal.fire('Error', 'Failed to load event details.', 'error');

            })

            .finally(() => {

                setLoading(false);

            });

    }, [id]); 





    //booking handle
    const handleBookNow = () => {

        //login ace kina check korlam
        if (!user) {

            Swal.fire({

                title: 'Not Logged In',
                text: "Please log in to book this event.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Go to Login',


            }).then((result) => {


                if (result.isConfirmed) {

                    navigate('/signin', { state: { from: `/events/${id}` } });

                }

            });
            return; 
        }
        


        
        const bookingData = {

            eventId: id,
            eventName: event.eventName,
            date: event.date,
            location: event.location,
            user_email: user.email, 



        };




        
        axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData, { withCredentials: true })
            .then(() => {

                Swal.fire('Success!', 'You have successfully booked this event.', 'success');
                navigate('/my-bookings'); 


            })



            .catch(err => {

                
                if (err.response && err.response.status === 400) {

                    Swal.fire('Already Booked', err.response.data.message, 'info');



                } else {

                    Swal.fire('Error', 'Failed to book the event.', 'error');
                }


            });
    };




   
    if (loading || authLoading) {
        
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }



 
    if (!event) {


        return <div className="text-center text-2xl py-20">Event not found.</div>;

    }




    return (

        <div className="container mx-auto px-4 py-12">

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card lg:card-side bg-base-100 shadow-xl"
            >


                <figure className="lg:w-1/2">
                
                    <img src={event.image || 'https://i.ibb.co/wJ3R4bg/placeholder-image.png'} alt={event.eventName} className="w-full h-full object-cover" />
                    
                </figure>


                <div className="card-body lg:w-1/2">


                    <h2 className="card-title text-3xl md:text-4xl">{event.eventName}</h2>
                    <p className="badge badge-primary badge-outline mt-2">{event.eventType}</p>
                    
                    <p className="mt-4"><strong>Date:</strong> {event.date}</p>
                    <p><strong>Location:</strong> {event.location || 'To Be Determined'}</p>
                    

                    <p className="mt-4 text-gray-500">
                        Organized by: {event.creatorName || 'N/A'}
                    </p>
                    


                    <p className="mt-4"><strong>Description:</strong> {event.description}</p>
                    

                    <div className="card-actions justify-end mt-6">
                        <button onClick={handleBookNow} className="btn btn-primary">Book Now</button>
                    </div>

                    
                </div>
            </motion.div>
        </div>
    );
};

export default EventDetails;
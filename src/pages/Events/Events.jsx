import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';





const Events = () => {


    
    const [events, setEvents] = useState([]);

    
    const [searchTerm, setSearchTerm] = useState('');


   
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        
        document.title = 'AthleticHub | Events';

     
        axios.get(`${import.meta.env.VITE_API_URL}/events`)
            .then(res => {

               
                if (Array.isArray(res.data)) {

                    setEvents(res.data);

                } else {

                    console.error("API did not return an array of events.");
                    setEvents([]);

                }

            })
            .catch(() => {


                
                Swal.fire('Error', 'Could not load the events.', 'error');

            })

            .finally(() => {

                
                setLoading(false);

            });

    }, []); 

    
    
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };





    
    const filteredEvents = events.filter(event =>

        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())

    );
    



    
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };



   
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">

            <h2 className="text-4xl font-bold mb-8 text-center">All Athletic Events</h2>

            {/* Search Bar Section */}

            <div className="mb-12 max-w-lg mx-auto">

                <div className="form-control">
                    <input
                        type="text"
                        placeholder="Search by event name or location..."
                        className="input input-bordered w-full shadow-sm"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>


            </div>





            {/* Events Grid Section */}

            {filteredEvents.length > 0 ? (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {filteredEvents.map((event, index) => (

                        <motion.div
                            key={event._id}
                            className="card bg-base-100 shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <figure>

                                <img src={event.image || 'https://i.ibb.co/wJ3R4bg/placeholder-image.png'} alt={event.eventName} className="h-56 w-full object-cover" />

                            </figure>




                            <div className="card-body">

                                <h3 className="card-title">{event.eventName}</h3>
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <p><strong>Location:</strong> {event.location || 'TBD'}</p>

                                <div className="card-actions justify-end mt-4">
                                    <Link to={`/events/${event._id}`} className="btn btn-primary">View Details</Link>
                                </div>

                            </div>
                        </motion.div>

                    ))}
                </div>

            ) : (
                
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No events found matching your search criteria.</p>
                </div>
            )}
        </div>
    );
};

export default Events;
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';



const ManageEvents = () => {

    const { user } = useAuth(); 
    const [events, setEvents] = useState([]); 
    const [loading, setLoading] = useState(true);

    

    
    useEffect(() => {
        document.title = 'AthleticHub | Manage Events';
    }, []);

    


    
    useEffect(() => {

        if (user?.email) {

            axios.get(`${import.meta.env.VITE_API_URL}/events?creatorEmail=${user.email}`, { withCredentials: true })
                .then(res => {

                    if (Array.isArray(res.data)) {
                        setEvents(res.data);
                    }


                })
                .catch(() => {

                    Swal.fire('Error', 'Failed to load your events.', 'error');

                })



                .finally(() => {

                    setLoading(false);
                });

        } else {

            setLoading(false);
        }
    }, [user]); 










   //event delete
    const handleDelete = (id) => {

        //confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        }).then((result) => {



            if (result.isConfirmed) {

               
                axios.delete(`${import.meta.env.VITE_API_URL}/events/${id}`, { withCredentials: true })

                    .then(() => {



                       
                        const remainingEvents = events.filter(event => event._id !== id);
                        setEvents(remainingEvents);
                        Swal.fire('Deleted!', 'The event has been deleted.', 'success');


                    })

                    .catch(() => {

                        Swal.fire('Error', 'Failed to delete the event.', 'error');

                    });


            }
        });
    };





    //spinner
    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }



    return (

        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Manage My Events</h2>


            {events.length === 0 ? (

               
                <div className="text-center py-12">
                    <p className="text-xl">You haven't created any events yet.</p>
                    <Link to="/create-event" className="btn btn-primary mt-4">Create Your First Event</Link>
                </div>


            ) : (


                
                <div className="overflow-x-auto">

                    <table className="table w-full">


                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>



                        <tbody>

                            {events.map(event => (

                                <tr key={event._id} className="hover">

                                    <td>{event.eventName}</td>
                                    <td>{event.date}</td>
                                    <td>{event.location || 'TBD'}</td>
                                    <td className="space-x-2">
                                        <Link to={`/update-event/${event._id}`} className="btn btn-primary btn-sm">Update</Link>
                                        <button onClick={() => handleDelete(event._id)} className="btn btn-error btn-sm">Delete</button>
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

export default ManageEvents;
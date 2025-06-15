import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import { useEffect } from 'react';



const CreateEvent = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    
    useEffect(() => {

        document.title = 'AthleticHub | Create Event';

    }, []);




    const handleSubmit = (e) => {

        e.preventDefault();
        const form = e.target;
        



        const eventData = {

            eventName: form.eventName.value,
            eventType: form.eventType.value,
            date: form.date.value,
            location: form.location.value,
            description: form.description.value,
            image: form.image.value,
            creatorEmail: user.email,
            creatorName: user.displayName,


        };




        axios.post(`${import.meta.env.VITE_API_URL}/events`, eventData, { withCredentials: true })

            .then(() => {

                Swal.fire('Success!', 'Your event has been created.', 'success');
                navigate('/manage-events');


            })


            .catch(err => {

                console.error("Create event error:", err);
                Swal.fire('Error', 'Failed to create the event.', 'error');
            });

            
    };



    return (
        <div className="container mx-auto px-4 py-12">


            <motion.div

                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card bg-base-100 shadow-xl max-w-4xl mx-auto"


            >
                <div className="card-body">

                    <h2 className="card-title text-3xl justify-center mb-8">Create a New Event</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">

                       {/* name er field */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">

                            <label className="md:text-right font-semibold">Event Name</label>
                            <input 
                                name="eventName" 
                                type="text" 
                                placeholder="e.g., Annual Sprint Championship" 
                                className="input input-bordered w-full md:col-span-3" 
                                required 
                            />

                        </div>




                        {/* event type er field */}

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">

                            <label className="md:text-right font-semibold">Event Type</label>

                            <select 
                                name="eventType" 
                                className="select select-bordered w-full md:col-span-3" 
                                required 
                                defaultValue=""
                            >

                                <option value="" disabled>Select a type</option>
                                <option value="Swimming">Swimming</option>
                                <option value="Sprinting">Sprinting</option>
                                <option value="Long Jump">Long Jump</option>
                                <option value="High Jump">High Jump</option>
                                <option value="Hurdle Race">Hurdle Race</option>

                            </select>


                        </div>





                        {/* Date Field */}

                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">


                            <label className="md:text-right font-semibold">Date</label>

                            <input 
                                name="date" 
                                type="date" 
                                className="input input-bordered w-full md:col-span-3" 
                                required 

                            />
                        </div>



                        
                        {/* Location er Field */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">

                              <label className="md:text-right font-semibold">Location</label>

                            <input 

                                name="location" 
                                type="text" 
                                placeholder="e.g., National Stadium" 
                                className="input input-bordered w-full md:col-span-3" 
                                required 

                            />

                        </div>


                        {/* Image URL er Field */}
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">

                            <label className="md:text-right font-semibold">Image URL</label>
                            <input 

                                name="image" 
                                type="url" 
                                placeholder="" 
                                className="input input-bordered w-full md:col-span-3" 
                                required 

                            />

                        </div>




                        {/* description er field */}
                        <div className="form-control">


                            <label className="label font-semibold">Description</label>
                            <textarea 
                                name="description" 
                                placeholder="Write a short description about the event" 
                                className="textarea textarea-bordered h-24 w-full" 
                                required
                            ></textarea>


                        </div>




                        {/* Submit Button */}
                        <div className="form-control mt-8">
                            <button type="submit" className="btn btn-primary w-full max-w-xs mx-auto">Create Event</button>
                        </div>




                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateEvent;
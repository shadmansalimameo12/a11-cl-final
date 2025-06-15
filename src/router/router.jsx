import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import SignIn from '../pages/SignIn/SignIn';
import Events from '../pages/Events/Events';

import EventDetails from '../pages/EventDetails/EventDetails';
import CreateEvent from '../pages/CreateEvent/CreateEvent';
import MyBookings from '../pages/MyBookings/MyBookings';
import ManageEvents from '../pages/ManageEvents/ManageEvents';
import UpdateEvent from '../pages/UpdateEvent/UpdateEvent';

import NotFound from '../pages/NotFound/NotFound';
import PrivateRoute from '../pages/shared/PrivateRoute';



const router = createBrowserRouter([


    {

        path: '/',

        element: <RootLayout />, 
        errorElement: <NotFound />, 
        children: [
           
            {
                index: true, 
                element: <Home />,
            },

            {
                path: 'register',
                element: <Register />,
            },


            {
                path: 'signin',
                element: <SignIn />,
            },

            {
                path: 'events',
                element: <Events />,
            },


            {
                path: 'events/:id',
                element: <EventDetails />,
            },


            // private routes start
            {
                path: 'create-event',
                element: <PrivateRoute><CreateEvent /></PrivateRoute>,
            },

            {
                path: 'my-bookings',
                element: <PrivateRoute><MyBookings /></PrivateRoute>,
            },

            {
                path: 'manage-events',
                element: <PrivateRoute><ManageEvents /></PrivateRoute>,
            },

            {
                path: 'update-event/:id',
                element: <PrivateRoute><UpdateEvent /></PrivateRoute>,
            },


        ],
    },
]);

export default router;
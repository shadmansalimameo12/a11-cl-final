import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import router from './router/router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthContext/AuthProvider.jsx';


const rootElement = document.getElementById('root');


const root = createRoot(rootElement);


root.render(

  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    
  </StrictMode>,


);
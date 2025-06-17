import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NotificationProvider } from './contexts/NotificationContext';
import { AuthProvider } from './hooks/useAuth';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <NotificationProvider>
      <BrowserRouter>
      <GoogleOAuthProvider clientId="552413329570-q7relm327eq0sf60a3t75p5v373upv0n.apps.googleusercontent.com">
          <AuthProvider>
            <App />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </NotificationProvider>
  );
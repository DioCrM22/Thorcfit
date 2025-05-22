import React, { createContext, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const typeMap = {
  success: toast.success,
  error:   toast.error,
  warning: toast.warn,
  info:    toast.info,
};

const NotificationContext = createContext({ notify: (msg, type) => {} });

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const notify = (message, type = 'info') => {
    const fn = typeMap[type] || toast;
    fn(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <ToastContainer />         {/* Renderiza as toasts */}
    </NotificationContext.Provider>
  );
};

// components/ToastProvider.tsx
import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastProvider: React.FC<ToastContainerProps> = (props) => {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      {...props} // Allow customization via props
    />
  );
};

export default ToastProvider;

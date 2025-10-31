'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="!bg-white !text-[#101010] !rounded-lg !shadow-lg !border !border-[#F1F1F1]"
        progressClassName="!bg-[#D87D4A]"
        bodyClassName="!text-[15px] !font-bold"
        closeButton={true}
      />
    </>
  );
}


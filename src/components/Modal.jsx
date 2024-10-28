// src/components/Modal.jsx
import React from 'react';

function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4">
        <button className="absolute top-2 right-2 text-black" onClick={onClose}>X</button>
        <div className="text-black">{children}</div>
      </div>
    </div>
  );
}

export default Modal;

import React from 'react'

const Modal = ({ children, toggleModal }) => {

  // this is responsible for closing modal
  function handleToggleModal(e) {
    if (e.target.id === "modal") {
      toggleModal();
    }
  }

  return (
    <div
      id='modal'
      onClick={handleToggleModal}
      className="fixed inset-0 bg-black/25 backdrop-blur-sm 
      flex justify-center items-center z-50 h-s"
    >
      {children}
    </div>
  );
};

export default Modal;
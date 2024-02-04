import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  styles?: React.CSSProperties;
  isOpen: boolean; // Accept isOpen as a prop to control modal visibility
  onClose: () => void; // Callback to close the modal
}

const Modal: React.FC<ModalProps> = ({ children, styles, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal when clicking outside
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]); // Include onClose in the dependency array to avoid stale closure

  const modalStyles: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    // Add any additional styles you want to apply
    ...styles,
  };

  return (
    <>
      {isOpen && (
        <div ref={modalRef} style={modalStyles}>
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;

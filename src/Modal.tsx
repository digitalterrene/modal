// src/Modal.tsx
import React, { useState, useEffect, useRef, ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  styles?: React.CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({ children, styles }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const modalStyles: React.CSSProperties = {
    display: open ? "block" : "none",
    // Add any additional styles you want to apply
    ...styles,
  };

  return (
    <>
      {open && (
        <div ref={modalRef} style={modalStyles}>
          {children}
        </div>
      )}
    </>
  );
};

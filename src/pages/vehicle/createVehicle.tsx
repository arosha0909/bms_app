import React, { useEffect, useRef, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  header?: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: React.ReactNode;
}

const CreateVehicle: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, header, children  }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationClass, setAnimationClass] = useState('fadeOut');

  useEffect(() => {
    if (isOpen) {
      setAnimationClass('fadeIn');
    } else {
      setAnimationClass('fadeOut');
      setTimeout(() => {
        if (modalRef.current) {
          modalRef.current.style.display = 'none';
        }
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && event.target === modalRef.current) {
        onClose();
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div
          ref={modalRef}
          className={` w-full h-full flex justify-center items-center animated faster absolute ${animationClass}`}
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <div className="border border-teal-500 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto absolute">
            <div className="modal-content py-4 text-left px-6">
              {/* Header */}
              <div className="flex justify-between items-center pb-3">
                <p className="text-3xl font-bold">{header}</p>
                <div
                  className="modal-close cursor-pointer z-50"
                  onClick={onClose}
                >
                  <svg
                    className="fill-current text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                  >
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                  </svg>
                </div>
              </div>

              {/* Body */}
              <div className="my-5">
                {children}
              </div>

              {/* Footer */}
              <div className="flex justify-end pt-2">
                <button
                  className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-black hover:bg-teal-400"
                  onClick={onConfirm}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateVehicle;

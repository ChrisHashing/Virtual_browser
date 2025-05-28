import React, { useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import styles from './Modal.module.css';
import Button from './Button';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent scrolling on the body when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.modalOverlayVisible : ''}`}>
      <div 
        ref={modalRef}
        className={`${styles.modalContent} ${isOpen ? styles.modalContentVisible : ''}`}
        style={{ maxWidth: size === 'large' ? '800px' : size === 'small' ? '400px' : '500px' }}
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </button>
        </div>
        
        <div className={styles.modalBody}>
          {children}
        </div>
        
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
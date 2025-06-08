import React from 'react';
import './popup.scss';

const Popup = ({
  title,
  children,
  onClose,
  onConfirm,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{title}</h3>
        <div className="popup-body">{children}</div>
        <div className="popup-buttons">
          {confirmText && (
            <button className="confirm-button" onClick={onConfirm}>
              {confirmText}
            </button>
          )}
          {cancelText && (
            <button className="cancel-button" onClick={onClose}>
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;

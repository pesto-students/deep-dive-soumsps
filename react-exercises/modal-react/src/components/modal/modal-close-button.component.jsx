import React, { useContext } from 'react';
import ModalContext from './modal-context.component';

const CloseButton = (props) => {
  let { closeModalCallback, closeButton, backdrop, onEscapeClose } = useContext(
    ModalContext
  );

  if (props.closeButton !== 'undefined' && typeof props.closeButton === 'boolean') {
    closeButton = props.closeButton;
  }
  if (!backdrop && !onEscapeClose) {
    closeButton = true;
  }
  const handleCloseButtonClick = () => {
    closeModalCallback(false);
  };

  console.log(props.children);
  return (
    closeButton && (
      <button
        className="modal-close"
        aria-label="modal-close-button"
        data-modal-close-button="true"
        onClick={() => handleCloseButtonClick()}
      >
        {props.children ? props.children : 'X'}
      </button>
    )
  );
};

export default CloseButton;

import React, { useEffect, useCallback } from 'react';
import ModalContext from './modal-context.component';
import Backdrop from './modal-backdrop.component';
import Body from './modal-body.component';
import Dialog from './modal-dialog.component';
import Header from './modal-header.component';
import Title from './modal-title.component';
import Footer from './modal-footer.component';
import {
  TAB_KEY_CODE,
  ESCAPE_KEY_CODE,
  IS_BACKDROP_PRESENT,
  BACKDROP_MODAL_CLOSE_ID,
  IS_CLOSE_BUTTON_PRESENT,
  ON_ESCAPE_CLOSE,
  MAX_MODAL_WIDTH,
  MAX_MODAL_HEIGHT,
} from './constants';
import './modal.styles.css';

const defaultValues = {
  backdrop: IS_BACKDROP_PRESENT,
  closeButton: IS_CLOSE_BUTTON_PRESENT,
  onEscapeClose: ON_ESCAPE_CLOSE,
  backdropModalCloseId: BACKDROP_MODAL_CLOSE_ID,
  maxWidth: MAX_MODAL_WIDTH,
  maxHeight: MAX_MODAL_HEIGHT,
};

const { Provider } = ModalContext;

const Modal = (props) => {
  const newModalValue = { ...defaultValues, ...props };

  const handleKeyboardButton = useCallback(
    (event) => {
      if (event.keyCode === ESCAPE_KEY_CODE && newModalValue.onEscapeClose) {
        event.preventDefault();
        newModalValue.closeModalCallback(false);
      }

      if (event.keyCode === TAB_KEY_CODE) {
        if (event.target.getAttribute('data-last-focusable')) {
          event.preventDefault();
          document.querySelector('[data-modal-close-button]').focus();
        } else if (event.target.getAttribute('data-modal-close-button')) {
          event.preventDefault();
          document.querySelector('[data-first-focusable]').focus();
        }
      }
    },
    [newModalValue]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardButton, false);
    if (
      !!document.querySelector('[data-first-focusable]') &&
      !!document.querySelector('[data-last-focusable]')
    ) {
      document.querySelector('[data-first-focusable]').focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboardButton, false);
    };
  }, [handleKeyboardButton]);

  return (
    <Provider value={newModalValue}>
      <Backdrop>
        <div id={newModalValue.backdropModalCloseId} className="modal-container">
          <Dialog>{props.children}</Dialog>
        </div>
      </Backdrop>
    </Provider>
  );
};

Modal.Header = Header;
Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export default Modal;

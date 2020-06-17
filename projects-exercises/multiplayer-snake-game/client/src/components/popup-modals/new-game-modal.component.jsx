import React, { useState, memo } from 'react';
import Modal from '../modal/modal.component';
import { navigate } from '@reach/router';

const NewGameModal = (props) => {
  const [playerName, setPlayerName] = useState('');

  const handleNewGameFormSubmit = (event) => {
    event.preventDefault();
    console.log('newGame form submit');
  };
  return (
    <Modal closeModalCallback={props.closeModalCallback}>
      <Modal.Header closeButton>
        <Modal.Title>Create Game Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={(event) => handleNewGameFormSubmit(event)}>
          <div className="form-input">
            <input
              tabIndex="1"
              type="text"
              id="playername"
              placeholder="Enter player name"
              required
              data-first-focusable="true"
              onChange={(event) => {
                setPlayerName(event.target.value);
              }}
            />
          </div>

          <button
            className="btn-normal"
            style={{ borderRadius: '5px', cursor: 'pointer' }}
            data-last-focusable="true"
          >
            Create
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default memo(NewGameModal);

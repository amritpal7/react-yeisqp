import React from 'react';

function NewModal({ open, children, onClose }) {
  if (!open) return null;

  return (
    <div>
      <fieldset>
        <legend>
          <h1>Settings</h1>
        </legend>
        {children}
        <button onClick={onClose}>Close</button>
      </fieldset>
    </div>
  );
}

export default NewModal;

import React from 'react';
import './Modal.css';

/**
 * Application default Modal component.
 * 
 * @param {*} props 
 */
const modal = props => (
    <div className="modal">
        <header className="modal__header">
            <h1>{props.title}</h1>
        </header>
        <section className="modal__content">{props.children}</section>
        <section className="modal__actions">
            {
                /**
                 * Display button if prop is true.
                 */
                props.canCancel && (
                    <button className="btn" onClick={props.onCancel/* parent class contains the function*/}>
                        Cancel
                    </button>
                )
            }
            {
                /**
                 * Display button if prop is true.
                 */
                props.canConfirm && (
                    <button className="btn" onClick={props.onConfirm /* parent class contains the function*/}>
                        Confirm
                    </button>
                )
            }
        </section>
    </div>
);

export default modal;
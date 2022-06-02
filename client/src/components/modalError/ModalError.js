import React from 'react';
import "./ModalError.css";

const ModalError = ({errorMessage}) => {
    return (
        <div className='modal-container'>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{errorMessage}</p>
        </div>
    );
}

export default ModalError;

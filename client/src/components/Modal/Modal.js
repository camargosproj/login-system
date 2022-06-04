import "./Modal.css";

const Modal = ({errorMessage}) => {
    return (
        <div className='modal-container'>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p>{errorMessage}</p>
        </div>
    );
}

export default Modal;

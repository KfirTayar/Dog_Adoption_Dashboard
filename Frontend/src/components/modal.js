import React, { useCallback, useEffect } from 'react';

import './modal.css';

function Modal({
                   closeModal,
                   displayModal,
                   id,
                   children
               }) {

    const handleKeyUp = useCallback(
        e => {
            if (e.key === 'Escape') {
                closeModal();
            }
        },
        [closeModal]
    );

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => window.removeEventListener('keyup', handleKeyUp);
    }, [handleKeyUp]);

    const clickedOutside = () => {
        closeModal()
    };

    const divStyle = {
        display: displayModal ? 'block' : 'none'
    };

    return (
        <div className="basic-modal" id={id} onClick={clickedOutside} style={divStyle}>
            <div
                className={'basic-modal-content'}
                onClick={e => e.stopPropagation()}
            >

                <button type="button" className="close" aria-label="Close" onClick={closeModal}>
                    <span aria-hidden="true">&times;</span>
                </button>
                {children}
            </div>
        </div>
    );
}

export default Modal;

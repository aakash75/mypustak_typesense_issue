import React, { useState } from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, closeModal, onConfirm }) => {
    return (
        <div >
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Custom Modal"
            >
                <div style={{ width: "50%", height: "50%", marginTop: 50 }}
                >
                    <h2>Confirmation</h2>
                    <p>Are you sure you want to proceed?</p>
                    <div className='flex justify-between '>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CustomModal;

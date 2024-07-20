import React, { useState } from 'react';
import { Button, TextField, Modal, Box } from '@mui/material';

const FindDogByChipIdModal = ({ shown, toggleModal, findDogByChipId }) => {
    const [chipId, setChipId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        findDogByChipId(chipId);
        toggleModal();
    };

    return (
        <Modal  open={shown} onClose={toggleModal}>
            <Box>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Chip ID"
                        value={chipId}
                        onChange={(e) => setChipId(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained">Find Dog</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default FindDogByChipIdModal;

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    textAlign: 'center',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid orange',
    borderRadius: '10px',
    boxShadow: 15,
    p: 4,
};

export default function AddNewDogModal({ open, handleClose, title, children }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h3" component="h2">
                    {title}
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    {children}
                </Box>
            </Box>
        </Modal>
    );
}

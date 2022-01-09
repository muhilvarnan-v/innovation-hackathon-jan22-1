import Layout from '../layouts/Default';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import React from "react";
import Typography from "@mui/material/Typography";
import OTPInput from "../components/OTPInput";
import Modal from "@mui/material/Modal";
import {getStore} from "../apis/backend";

function Login() {
    const { t } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const login = () => {
        getStore(phoneNumber)
        .then(res => {
            localStorage.setItem('store_id', res.id);
            window.location = "/";
        });
    }

    return (
        <Layout>
            <Box sx={{ marginTop: '30vh', padding: 1 }}>
                <TextField
                    fullWidth
                    id="outlined-textarea"
                    label={t("Phone number")}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button
                    variant="outlined"
                    onClick={handleOpen}
                    fullWidth
                    style={{ marginTop: 10 }}
                >{t('Generate OTP')}</Button>
                <Typography variant="caption" display="block" gutterBottom
                    sx={{ marginTop: '10px', textAlign: 'center' }}>
                    {t("OR")}
                </Typography>
                <Typography variant="button" display="block" gutterBottom onClick={() => window.location = "/register"}
                    sx={{ color: '#1976d2', marginTop: '10px', textAlign: 'center' }}>
                    {t("Register your shop")}
                </Typography>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{}}>
                    <OTPInput handleChange={login} />
                </Box>
            </Modal>
        </Layout >
    );
}

export default Login;

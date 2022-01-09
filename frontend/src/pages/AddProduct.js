import {styled} from '@mui/material/styles';
import Layout from '../layouts/Default';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import React, {Fragment, useState} from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import AudioScanner from '../components/AudioScanner';
import { useTranslation } from 'react-i18next';
import Button from "@mui/material/Button";
import PreviewCatalog from '../components/PreviewCatalog';
import UploadIcon from "@mui/icons-material/Upload";
import Badge from "@mui/material/Badge";
import {addProductToStore} from "../apis/backend";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function AddProduct() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({})
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openPreview, setOpenPreview] = useState(false);

    const handleAddProductToStore = () => {
        alert('Product added sucessfully to the store');
        window.location = "/"
    }

    const handleFieldChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        })
    }

    const mainAction = (<Fragment>
        <StyledFab color="secondary" aria-label="add" onClick={() => setOpenPreview(true)}>
            <UploadIcon />
        </StyledFab>
        <PreviewCatalog open={openPreview}
                        addProductToStore={handleAddProductToStore}
                        selectedProducts={[formData]}
                        handleClose={() => setOpenPreview(false)} />
    </Fragment>)

    return (
        <Layout mainActionComponent={mainAction}>
            <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Name">{t("Product Name")}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Name"
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    type={'text'}
                    value={formData['name'] ? formData['name'] : ''}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                edge="end"
                                onClick={handleOpen}
                            >
                                <KeyboardVoiceIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    label={t("Product Name")}
                />
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AudioScanner handleChange={(value) => { handleFieldChange('name', value); handleClose(); }} />
                    </Box>
                </Modal>
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="parent-category">{t("Parent Category")}</InputLabel>
                <Select
                    labelId="parent-category"
                    id="parent-category"
                    label={t("Parent Category")}
                    onChange={(e) => handleFieldChange('parent_category', e.target.value)}
                    value={formData['parent_category'] ? formData['parent_category'] : ''}
                >
                    <MenuItem value="Baby Care">{t("Baby Care")}</MenuItem>
                    <MenuItem value="Beverages">{t("Beverages")}</MenuItem>
                    <MenuItem value="Biscuits & Snacks">{t("Biscuits & Snacks")}</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="Sub-category">{t("Sub Category")}</InputLabel>
                <Select
                    labelId="Sub-category"
                    id="Sub-category"
                    label={t("Sub Category")}
                    onChange={(e) => handleFieldChange('sub_category', e.target.value)}
                    value={formData['sub_category'] ? formData['sub_category'] : ''}
                >
                    <MenuItem value="Chocolates & Candies">{t("Chocolates & Candies")}</MenuItem>
                    <MenuItem value="Chips & Crisps">{t("Chips & Crisps")}</MenuItem>
                    <MenuItem value="Sweets & Snacks">{t("Sweets & Snacks")}</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Price">{t("Selling Price")}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Price"
                    type={'text'}
                    startAdornment={
                        <div>₹ </div>
                    }
                    onChange={(e) => handleFieldChange('sellingPrice', e.target.value)}
                    value={formData['sellingPrice'] ? formData['sellingPrice'] : ''}
                    label={t("Selling Price")}
                />
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Quantity">{t("Quantity")}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Quantity"
                    type={'text'}
                    onChange={(e) => handleFieldChange('quantity', e.target.value)}
                    label={t("Quantity")}
                    value={formData['quantity'] ? formData['quantity'] : ''}
                />
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-Weight">{t("Weight")}</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-Weight"
                    type={'text'}
                    onChange={(e) => handleFieldChange('weight', e.target.value)}
                    label={t("Weight")}
                    value={formData['weight'] ? formData['weight'] : ''}
                />
            </FormControl>
            <FormControl sx={{ mb: 2 }} fullWidth>
                <InputLabel id="Unit">{t("Unit")}</InputLabel>
                <Select
                    labelId="Unit"
                    id="Unit"
                    label={t("Unit")}
                    onChange={(e) => handleFieldChange('unit', e.target.value)}
                    value={formData['unit'] ? formData['unit'] : ''}
                >
                    <MenuItem value="Liter">{t("Liter")}</MenuItem>
                    <MenuItem value="Kg">{t("Kg")}</MenuItem>
                    <MenuItem value="Cm">{t("Cm")}</MenuItem>
                </Select>
            </FormControl>
        </Layout>
    );
}

export default AddProduct;

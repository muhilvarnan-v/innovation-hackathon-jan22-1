
import { Fragment, useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Layout from '../layouts/Default';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

import ProductItem from '../components/ProductItem';

import { getStoreProducts } from "../apis/backend";
import IconButton from '@mui/material/IconButton';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useTranslation } from 'react-i18next';

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
    width: 250,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

function HomePage() {
    const { t } = useTranslation();
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [syncCompleted, setSyncCompleted] = useState(false);

    const createProduct = ({ id, price, mrp, image256, sku, weight, unit, parentCategory, subCategory }) => {
        return {
            id: id,
            name: sku,
            description: `${parentCategory} - ${subCategory} - ${weight} ${unit}`,
            thumbnail_image: image256,
            mrp_price: mrp,
            selling_price: price,
            quantity: 9
        }
    }

    useEffect(() => {
        getStoreProducts()
            .then(data => {
                setProducts(data.map(createProduct))
            })
    }, []);

    const mainAction = (
        <StyledFab color="secondary" aria-label="add" onClick={() => window.location = "/product/catalog/add"}>
            <AddIcon />
        </StyledFab>)

    const mainLeftAction = (<Fragment>
        <IconButton color="inherit" aria-label="open drawer" onClick={handleOpen}>
            <CloudSyncIcon />
        </IconButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {!syncCompleted ? <Fragment>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {t("Sync your products")}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
                        {t("You have 10 products in your catalog. please press publish button to push to cloud")}
                    </Typography>
                    <Button variant="contained" startIcon={<CloudSyncIcon />} onClick={() => setSyncCompleted(true)}>{t("Publish")}</Button>
                </Fragment> :
                    <Fragment>
                        <ThumbUpIcon style={{ fontSize: '80px' }} color="success" />
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {t("your products has been synced successfully")}
                        </Typography>
                        <Button variant="contained" onClick={handleClose}>{t("Ok")}</Button>
                    </Fragment>
                }
            </Box>

        </Modal>
    </Fragment>
    )

    return (
        <Layout mainActionComponent={mainAction} mainLeftActionComponent={mainLeftAction}>
            {
                !products.length ? <Fragment>
                    <Typography id="modal-modal-title" variant="h6" style={{ textAlign: 'center', marginTop: '50%' }} component="h2">
                        {t("No Products in your catalog, Please press + icon to add items to your catalog")}
                    </Typography>
                </Fragment> : null
            }
            {
                products.map((product, key) => <ProductItem key={key} product={product} isEditable={true} />)

            }
        </Layout>
    );
}

export default HomePage;

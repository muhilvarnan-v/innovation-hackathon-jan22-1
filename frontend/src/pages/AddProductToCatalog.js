import React, { Fragment, useState } from "react";
import { styled } from '@mui/material/styles';
import Layout from '../layouts/Default';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AudioInput from '../components/AudioInput';
import BarcodeInput from '../components/BarcodeInput';
import ProductItem from '../components/ProductItem';
import Badge from '@mui/material/Badge';
import { useTranslation } from 'react-i18next';
import { searchMasterProducts, addProductToStore } from "../apis/backend";
import PreviewCatalog from '../components/PreviewCatalog';

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -6,
        top: -2
    },
}));

function AddProductPage() {


    const { t } = useTranslation();
    const [searchText, setSearchText] = useState('');
    const [searchItems, setSearchItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [openPreview, setOpenPreview] = useState(false);

    const createProduct = ({ id, sku, image256, mrp, parentCategory, subCategory, weight, unit }) => {
        return {
            id,
            name: sku,
            description: `${parentCategory} - ${subCategory} - ${weight} ${unit}`,
            thumbnail_image: image256,
            mrp_price: mrp,
            selling_price: mrp,
            quantity: 1
        }
    }

    const search = () => {
        searchMasterProducts(searchText)
            .then((data) => {
                setSearchItems(data.slice(0, 20).map(createProduct))
            });
    }

    const selectItem = ({ id, mrp_price, name }) => {
        setSelectedItems({
            ...selectedItems,
            [id]: {
                sellingPrice: mrp_price,
                name,
                quantity: 1
            }
        })
    }

    const unSelectItem = ({ id }) => {
        const { [id]: remove, ...remaining } = selectedItems
        setSelectedItems(remaining)
    }

    const isSelected = (id) => {
        return selectedItems.hasOwnProperty(id);
    }

    const updateSelectedItem = (id, field, value) => {
        setSelectedItems({
            ...selectedItems,
            [id]: {
                ...selectedItems[id],
                [field]: value
            }
        })
    }

    const handleAddProductToStore = () => {
        const products = Object.keys(selectedItems).map(id => {
            return {
                "price": selectedItems[id].sellingPrice,
                "quantity": selectedItems[id].quantity,
                "masterId": id
            }
        })


        addProductToStore(products)
            .then(data => {
                setSelectedItems([]);
                setSearchText('');
                setOpenPreview(false);
                alert('Product added sucessfully to the store');
                window.location = "/"
            });
    }

    const mainAction = (<Fragment>
        <StyledFab color="secondary" aria-label="add" onClick={() => setOpenPreview(true)}>
            <StyledBadge badgeContent={Object.keys(selectedItems).length} color="primary">
                <UploadIcon />
            </StyledBadge>
        </StyledFab>
        <PreviewCatalog open={openPreview}
            addProductToStore={handleAddProductToStore}
            selectedProducts={selectedItems}
            handleClose={() => setOpenPreview(false)} />
    </Fragment>)

    return (
        <Layout mainActionComponent={mainAction}>
            <Grid container>
                <Grid item xs={6}>
                    <BarcodeInput handleChange={(value) => setSearchText(value)} />
                </Grid>
                <Grid item xs={6}>
                    <AudioInput handleChange={(value) => setSearchText(value)} />
                </Grid>
                <TextField
                    id="outlined-textarea"
                    style={{ width: '100%', marginLeft: 5, marginRight: 5 }}
                    label={t("Enter text to search")}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Grid container style={{ textAlign: 'center' }}>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            onClick={search}
                            style={{ width: '90%', marginTop: 10 }}
                        >{t('Search Item')}</Button>

                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            onClick={() => window.location = '/product/add'}
                            style={{ width: '90%', marginTop: 10 }}
                        >{t('Add Item')}</Button>

                    </Grid>
                </Grid>

                <div>
                    {searchItems.map((item, key) => <ProductItem
                        key={key}
                        product={item}
                        isSelectAble={true}
                        selectItem={selectItem}
                        unSelectItem={unSelectItem}
                        isSelected={isSelected(item.id)}
                        selectedItem={isSelected(item.id) ? selectedItems[item.id] : {}}
                        updateSelectedItem={updateSelectedItem}
                    />)}
                </div>
            </Grid>
        </Layout>
    );
}

export default AddProductPage;

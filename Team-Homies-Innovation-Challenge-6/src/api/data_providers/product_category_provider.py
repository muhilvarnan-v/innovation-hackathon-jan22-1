from src.api.utils import utils


def get_product_category(product_name):
    return utils.mapper('src/api/config/product_categories.csv', 'product_name', product_name, 'category')

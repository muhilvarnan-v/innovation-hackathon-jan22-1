from src.api.utils import utils


def get_lot_size(no_lots, product_name):
    return f"{no_lots * 100} {utils.mapper('src/api/config/lot_size_mappings.csv', 'product_name', product_name, 'actual_unit')}"

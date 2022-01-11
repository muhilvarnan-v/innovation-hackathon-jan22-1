from src.api.utils import utils


def get_location(store_id):
    return utils.mapper('src/api/config/locations.csv', 'store_id', store_id, 'location')

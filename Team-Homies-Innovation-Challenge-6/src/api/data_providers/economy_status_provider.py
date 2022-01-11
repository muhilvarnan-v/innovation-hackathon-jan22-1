from src.api.utils import utils


def get_economy_status(location, month, year):
    return utils.status_mapper('src/api/config/economy_status.csv', 'location', f"{month}/{year}", location, 'status')

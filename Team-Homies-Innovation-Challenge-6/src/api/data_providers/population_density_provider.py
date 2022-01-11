from src.api.utils import utils


def get_population_density(location):
    return utils.mapper('src/api/config/population_density.csv', 'location', location, 'density')

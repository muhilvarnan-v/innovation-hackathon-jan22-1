from src.api.utils import utils


def get_weather(month):
    return utils.mapper('src/api/config/weather_data.csv', 'month', month, 'weather')

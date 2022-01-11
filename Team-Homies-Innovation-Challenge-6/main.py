import csv
import os
import pickle

import pandas as pd
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi

from src.api.data_providers import location_provider, health_status_provider, economy_status_provider, \
    population_density_provider, festivals_provider, weather_data_provider, lot_size_provider, product_category_provider
from src.api.models.LogisticPredictionRequest import LogisticPredictionRequest
from src.api.models.LogisticResponse import LogisticResponse
from src.api.models.RetailRequest import RetailRequest
from src.api.models.RetailResponse import RetailResponse
from src.api.models.TrainDataRequest import TrainDataRequest
from src.api.utils import utils

INDIA_POPULATION = 1300000000
MAX_DIST = 1000
MAX_WT = 100
LOGISTIC_COMPANIES = ['E-Dlvry', 'E-Kart', 'E-Com']
num_col = ["Distance in km", "Wieght", "Population Density"]
norm_val = [MAX_DIST, MAX_WT, INDIA_POPULATION]

app = FastAPI()


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Hommies-Inventory Management",
        version="1.0.0",
        description="API's for predicting the lot-size and logistic optimal price",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi


@app.post('/retail/prediction', status_code=200,
          name="Predict Lot-Size",
          description="Predict the lot-size for the given product list and the given date(month)."
                      "Below stores and products are configured while training the model\n"
                      "store_ids : mum-str-1, mum-str-2, kol-str-1, kol-str-2\n"
                      "products : Rice,Sugar,Notebook,Sanitizer,Mask,Cold drink,Tea,Soap,Umbrella\n"
                      "date should be in valid format. Ex. 2020-02-09 15:27:49.529933\n"
                      "Use these values while sending the API request.",
          response_description="Returns the lot size for the given product list and the given date(month)",
          response_model=RetailResponse)
async def predict(retail_request: RetailRequest):
    response = []
    products = retail_request.products
    for product in products:
        response.append(get_prediction_for_product(retail_request, product))
    return response


@app.post('/retail/update-data-set', status_code=201,
          name="Update Retail Data-Set",
          description="Update the retail master data-set, which can be used to retrain the model."
                      "\nPlease send the request in the following format:\n"
                      "Refer to this file on github : main/master_data/master_data.csv",
          )
async def update_train_data(train_data: TrainDataRequest):
    with open('./master_data/master_data.csv', 'a') as f:
        for row in train_data.data:
            writer = csv.writer(f)
            writer.writerow(row.dict().values())
    return "Done"


@app.post('/logistic/prediction', status_code=200, name="Predict optimal logistics delivery provider",
          description="Predict optimal logistics delivery provider for the given location and distance"
                      "Below Cities are used while training the model.\n"
                      "city : Mumbai, Kolkata\n"
                      "Use these values while sending the API request.",
          response_model=LogisticResponse)
async def predict_optimal_logistic_provider(logistic_request: LogisticPredictionRequest):
    month = utils.get_month(logistic_request.date)
    weather = weather_data_provider.get_weather(month)
    population_density = population_density_provider.get_population_density(logistic_request.city.title())

    data_point = pd.DataFrame({
        "Distance in km": [logistic_request.distance],
        'City': [logistic_request.city.title()],
        'weather ': [weather],
        'Wieght': [logistic_request.weight],
        'Holiday': ["no"],
        'Population Density': [population_density]
    })
    optimal_prediction = {'company': "", "price": None}
    for company in LOGISTIC_COMPANIES:
        model_file = open(os.path.join("trained_models", "logistic_" + company + ".pkl"), 'rb')
        model = pickle.load(model_file)
        logistic_data_point = create_logistic_data_point(company, data_point)
        model_file.close()
        current_prediction = model.predict(
            logistic_data_point)
        if optimal_prediction['price'] is not None and optimal_prediction['price'] < current_prediction[0]:
            optimal_prediction = {"company": company, "price": current_prediction[0]}
        elif optimal_prediction['price'] is None:
            optimal_prediction = {"company": company, "price": current_prediction[0]}
    return optimal_prediction


def get_prediction_for_product(prediction_request, product_name):
    store_id = prediction_request.store_id
    month = utils.get_month(prediction_request.date)
    year = utils.get_year(prediction_request.date)
    location = location_provider.get_location(store_id)
    economy_status = economy_status_provider.get_economy_status(
        location, month, year)
    health_status = health_status_provider.get_health_status(
        location, month, year)
    population_density = population_density_provider.get_population_density(
        location)
    festivals = festivals_provider.get_festivals(location, month, year)
    weather = weather_data_provider.get_weather(month)
    product_category = product_category_provider.get_product_category(product_name)
    predicted_lot_size = predict_quantity({
        "store_id": store_id,
        "product_name": product_name,
        "product_category": product_category,
        "month": month,
        "year": year,
        "economy_status": economy_status,
        "health_status": health_status,
        "population_density": population_density,
        "festivals": festivals,
        "weather": weather
    })
    final_prediction_val = lot_size_provider.get_lot_size(predicted_lot_size, product_name)
    if "None" not in final_prediction_val.split():
        return {f"{product_name}": {
            "store_id": prediction_request.store_id,
            "product_name": product_name,
            "prediction": final_prediction_val
        }}
    else:
        return {
            f"{product_name}": {
                "store_id": store_id,
                "product_name": product_name,
                "prediction": "NaN",
                "error": "No Product with the given Name"
            }
        }


def encode_features(store_id):
    encoder_file = open(os.path.join("feature_encoder", f"ohe_{store_id}.obj"), 'rb')
    encoder_loaded = pickle.load(encoder_file)
    encoder_file.close()
    return encoder_loaded


def create_encoded_data_point(data_point, store_id):
    encoder = encode_features(store_id)
    data_point_ohe = encoder.transform(data_point.drop(columns=["population density"], axis=1))
    input_data_point = pd.concat([data_point_ohe, data_point["population density"] / INDIA_POPULATION], axis=1)
    return input_data_point


def predict_quantity(request_details):
    data_point = pd.DataFrame({
        "product name": [request_details['product_name']],
        'p _ category': [request_details['product_category']],
        'eonomical crisis': [request_details['economy_status']],
        'health crisis': [request_details['health_status']],
        'festivals in region ': [request_details['festivals']],
        'weather': [request_details['weather']],
        'population density': [request_details['population_density']]
    })
    input_data_point = create_encoded_data_point(data_point, request_details['store_id'])
    model_file = open(os.path.join("trained_models", f"{request_details['store_id']}.pkl"), 'rb')
    model = pickle.load(model_file)
    predicted_lot_size = model.predict(input_data_point)
    model_file.close()
    return round(predicted_lot_size[0], 1)


def normalize(data, columns, normalize_value):
    for col, val in zip(columns, normalize_value):
        data[col] = data[col] / val
    return data


def encode_logistic_features(logistic_company):
    encoder_file = open(os.path.join("feature_encoder", "logistic_" + logistic_company + ".obj"), 'rb')
    encoder_loaded = pickle.load(encoder_file)
    encoder_file.close()
    return encoder_loaded


def create_logistic_data_point(logistic_company, data_point):
    encoder_loaded = encode_logistic_features(logistic_company)
    data_point_ohe = encoder_loaded.transform(data_point)
    input_data_point = normalize(data_point_ohe, num_col, norm_val)
    return input_data_point

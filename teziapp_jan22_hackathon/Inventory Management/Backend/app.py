import numpy as np
# import sklearn
import pickle
# from sklearn.neural_network import MLPClassifier
from flask import Flask, request, jsonify
from main import *

app = Flask(__name__)
req = {
    "revenue": {
        "Expected revenue": "er",
        "Previous revenue": "2000",
    },

    "Profit":
        {

            "Expected profit": "100",
            "Previous profit": "200",
        },

    "order list":
        {
            "orderid": "id",
            "productid": "id",
            "ProductName": "string",

            "price":
                {
                    "mrp": "number",
                    "salePrice": "number",
                    "costPrice": "number",
                },

            "productCategory": "string",

            "Timestamp": "unix"
        },

}


def predict_or_output(num1, num2):
    output = {'output_prediction': 0}
    print(output)
    return output


app = Flask(__name__)


@app.route("/")
def index():
    return "ONDC Prediction!"


@app.route("/products", methods=['GET'])
def get_product_name():
    return jsonify(productnames)


@app.route("/product_mrp", methods=['GET'])
def get_product_mrp():
    return jsonify(product_mrp)

@app.route("/product_cost", methods=['GET'])
def get_product_cost():
    return jsonify(product_cost)

@app.route("/user_input", methods=['POST'])

def post_userdetails():
    working_capital = request.json('workingCapital')
    space = request.json('space')
    order_capacity = request.json('ordercapacity')

@app.route("/predictions", methods=['GET'])
def get_predictions():
    return jsonify(res)

if __name__ == "__main__":
    app.run()

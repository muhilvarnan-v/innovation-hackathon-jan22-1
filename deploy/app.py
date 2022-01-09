from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
import json
import numpy as np

import tensorflow
# Keras
from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Flask utils
from flask import Flask,jsonify, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
import os

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
#MODEL_PATH = 'model/standard.h5'

# Load your trained model
print(os.getcwd())
model = load_model('./model/model.h5')
#model._make_predict_function()          # Necessary
# print('Model loaded. Start serving...')

# You can also use pretrained model from Keras
# Check https://keras.io/applications/
#from keras.applications.resnet50 import ResNet50
#model = ResNet50(weights='imagenet')
#model.save('')
print('Model loaded. Check http://127.0.0.1:3000/')


def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(100, 100))

    # Preprocessing the image
    img = np.asarray(img)
    # x = np.true_divide(x, 255)
    img = np.expand_dims(img, axis=0)

    # Be careful how your trained model deals with the input
    # otherwise, it won't make correct prediction!
    #x = preprocess_input(x, mode='caffe')

    # output = model.predict_classes(img)

    predict_x=model.predict(img) 
    output=np.argmax(predict_x,axis=1)

    return output


@app.route('/', methods=['GET'])
def index():
    # Main page
    return render_template('index.html')


@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)


        # Make prediction
        prod = {0 : '5 Star', 1 : 'Good Day Butter Cookies', 2 : 'Good Day Cashew Cookies', 3 : "Ching's Noodles", 4 : 'Good Day Choco Chip Cookies',
                5 : 'Dabur Gulabari', 6 : 'Dark Fantasy Choco Fills', 7 : 'Dettol Antiseptic', 8 : 'Doritos Nacho Cheesa', 9 : 'Fanta',
                10 : 'Fogg Radiate Orange', 11 : 'Gems', 12 : "Hershey's Chocolate Syrup", 13 : 'Kinley', 14 : 'Kissan Mixed Fruit Jam',
                15 : "KitKat", 16 : "Kurkure Masala Munch", 17 : "Lay's", 18 : "L'oreal", 19 : 'Lotte Choco Pie', 20 : 'Marie Gold',
                21 : 'Mirinda', 22 : 'Mysore Sandal Soap', 23 : 'Nutella', 24 : 'Oreo', 25 : 'Parachute Hair Oil', 26 : 'Pepsi', 27 : 'Perk',
                28 : "Pond's DreamFlower", 29 : "Realme Buds", 30 : "Rubix Cube", 31 : 'Snickers', 32 : 'Sprite', 33 : 'Toblerone Dark',
                34 : 'Toilet Paper', 35 : 'Yippee Magic Masala'}
        
        output = model_predict(file_path, model)
        pred = output[0]

        for key, value in prod.items():
            if pred == key:
                import pandas as pd
                database=pd.read_csv("./static/bigbasketProducts.csv")
                v=database[database["Product_Name"].str.contains(value)]
                # print(v)
                v.to_csv("./static/new_add.csv")
                out = v.to_json(orient='records')[1:-1].replace('},{', '} {')
                with open("./static/catalogue.json","a") as outfile:
                    json.dump(out, outfile)
                v="{Product Name:"+v["Product_Name"].tolist()[0]+" Brand Name:"+ v["Brand_Name"].tolist( )[0] +" Category Name:" + v["Product_Category"].tolist()[0]+"<br> Product Weight:"+ str(v["Product_Weight"].tolist()[0])+" Product_Description:" + v["Product_Description"].tolist()[0]+" Product_SP:"+ str(v["Product_SP"].tolist()[0])+" Product_MRP:"+str(v["Product_MRP"].tolist()[0])+"}"
                # print(v)
                # Product_SP +
                # Product_MRP
                return v
        '''if pred == 0:
            return "Dabur Rose"
        elif pred == 1:
            return"Dark Fantasy"
        elif pred == 2:
            return "Dettol Antiseptic"
        elif pred == 3:
            return "Doritos"
        elif pred == 4:
            return "Kissan Jam"
        elif pred == 5:
            return "Mysore Sandal Soap"
        elif pred == 6:
            return "Parachute Oil"
        elif pred == 7:
            return "Toblerone Dark"
        elif pred == 8:
            return "Yippee Magic Masala"'''
        # Process your result for human
        # pred_class = preds.argmax(axis=-1)            # Simple argmax
        #pred_class = decode_predictions(preds, top=1)   # ImageNet Decode
        #result = str(pred_class[0][0][1])               # Convert to string
        #return result
    return None


if __name__ == '__main__':
    app.run(debug=True)
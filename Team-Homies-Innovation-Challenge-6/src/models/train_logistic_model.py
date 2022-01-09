import pandas as pd
import os
from category_encoders import OneHotEncoder
from utils import normalize, regression_results
import pickle
import sklearn.metrics as metrics
from sklearn.model_selection import GridSearchCV, TimeSeriesSplit
from sklearn.ensemble import RandomForestRegressor


MAX_DIST = 1000
MAX_WT = 100
INDIA_POPULATION = 1300000000

def train_logistic(logistic_company):
    data = pd.read_csv(os.path.join("data", "logistic_data", logistic_company+".csv"))
    data.sort_values(by = ["Date"], inplace=True)
    data = data.drop(columns=["Date", "Logistic Partner "])
    train, test = data[:len(data)], data[:len(data)]

    train_X, ytrain = train.drop(columns=["Charge / Cost in Rupees"], axis=1), train["Charge / Cost in Rupees"]
    test_X, ytest = test.drop(columns=["Charge / Cost in Rupees"], axis=1), test["Charge / Cost in Rupees"]

    one_hot_encoder = OneHotEncoder().fit(train_X)
    train_X = one_hot_encoder.transform(train_X)
    test_X = one_hot_encoder.transform(test_X)

    num_col = ["Distance in km", "Wieght", "Population Density"]
    norm_val = [MAX_DIST, MAX_WT, INDIA_POPULATION]
    xtrain = normalize(train_X, num_col, norm_val)
    xtest = normalize(test_X, num_col, norm_val)


    filehandler = open(os.path.join("feature_encoder","logistic_"+logistic_company+".obj"),"wb")
    pickle.dump(one_hot_encoder,filehandler)
    filehandler.close()

    model = RandomForestRegressor()
    param_search = { 
        'n_estimators': [20, 50, 100],
        'max_features': ['auto', 'sqrt', 'log2'],
        'max_depth' : [i for i in range(5,15)]
    }
    tscv = TimeSeriesSplit(n_splits=10)
    gsearch = GridSearchCV(estimator=model, cv=tscv, param_grid=param_search, scoring = metrics.mean_squared_error)
    gsearch.fit(xtrain, ytrain)
    best_score = gsearch.best_score_
    best_model = gsearch.best_estimator_
    y_true = ytest.values
    y_pred = best_model.predict(xtest)
    regression_results(y_true, y_pred)

    model_handler = open(os.path.join("trained_models","logistic_"+logistic_company+".pkl"),"wb")
    pickle.dump(best_model,model_handler)
    model_handler.close()




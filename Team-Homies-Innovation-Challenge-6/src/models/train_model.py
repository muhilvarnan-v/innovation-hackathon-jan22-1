import pandas as pd
from category_encoders import OneHotEncoder
import pickle
import os
from utils import regression_results
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import GridSearchCV, TimeSeriesSplit
import sklearn.metrics as metrics

INDIA_POPULATION = 1300000000
def train(store_id):
    data = pd.read_csv(os.path.join("data", "store_data", store_id+".csv"))
    data.sort_values(by = ["date"], inplace=True)
    train_data = data.drop(columns=["date", "store_id", "city / District "])

    train, test = train_data[:len(data)], train_data[:len(data)]
    train_X, ytrain = train.drop(columns=["lot size "], axis=1), train["lot size "]
    test_X, ytest = test.drop(columns=["lot size "], axis=1), test["lot size "]   

    one_hot_encoder = OneHotEncoder().fit(train_X.drop(columns=["population density"], axis=1))
    train_X_ohe = one_hot_encoder.transform(train_X.drop(columns=["population density"], axis=1))
    test_X_ohe = one_hot_encoder.transform(test_X.drop(columns=["population density"], axis=1)) 

    xtrain = pd.concat([train_X_ohe, train_X["population density"]/INDIA_POPULATION], axis = 1)
    xtest = pd.concat([test_X_ohe, test_X["population density"]/INDIA_POPULATION], axis = 1)

    filehandler = open(os.path.join("feature_encoder","ohe_"+store_id+".obj"),"wb")
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

    model_handler = open(os.path.join("trained_models",store_id+".pkl"),"wb")
    pickle.dump(best_model,model_handler)
    model_handler.close()






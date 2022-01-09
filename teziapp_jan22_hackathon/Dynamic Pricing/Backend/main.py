from random import *
import itertools
import re
import numpy as np
import pandas as pd
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
import pickle
data = pd.read_csv('ondc_Finale - ondc_Finale (1).csv')
df = pd.DataFrame(data)
products = {}
# Weather preprocessing
product_weather=df["Weather"].to_list()
product_name =df['ProductName'].to_list()
weather = []

ix = 2400
iy = 2450
hotcount = 0
coldcount = 0
product_weather = product_weather[ix : iy]
product_name = product_name[ix : iy]
for i in product_weather:
    if i == "cold":
        coldcount = coldcount+1

    else:
        hotcount = hotcount + 1

if coldcount > hotcount:
    weather.append('cold')
else:
    weather.append('hot')

products = {product_name[0]:weather[0]}


prod={'Diaper': 'hot','soap': 'hot','Detergent': 'hot','salt': 'hot','Toothpaste': 'hot','Brush': 'hot','Towel': 'hot','Bucket': 'hot','Mug': 'hot','cofee': 'hot','suger': 'hot','Tea': 'hot','Bread': 'hot','Toast': 'hot','Rice': 'hot','Dall': 'hot','Wheat': 'hot','Groundnut': 'hot','turmuric': 'hot','Chilli powder': 'hot','Garam masala': 'hot','Jeggry': 'hot','shampoo': 'hot','Face wash': 'hot','Matchbox': 'cold',
'Agarabgti': 'hot','All-out':'hot','Sanitizer': 'hot','hair oil': 'hot','powder': 'hot','oill': 'hot','Biscuit': 'hot','Hair-dye': 'hot','Maggie': 'hot',
'pasta': 'hot','Cream': 'hot','Kapoor': 'hot','Green tea':'hot','Mayo': 'hot','popcorn': 'hot','papad': 'hot','Besan': 'hot','soji': 'low','paua': 'hot','soyabean': 'hot','Harpic': 'hot','Had-wash': 'hot'}

product_income=df["Median Income"].to_list()
product_name =df['ProductName'].to_list()

income = []

ia = 2450
ib = 2500
lowcount = 0
highcount = 0
product_income = product_income[ia : ib]
product_name = product_name[ia : ib]

for i in product_income:
    if i >=75000:
        highcount = highcount+1

else:
    lowcount = lowcount + 1

if highcount > lowcount:
    income.append('high')
else:
    income.append('low')

product_inc = {product_name[0]:income[0]}

prod_inc={'Diaper':'low','soap':'high','Detergent':'high','salt':'high','Toothpaste':'high','Brush':'low','Towel':'high','Bucket':'low',
          'Mug': 'low','cup':'low','cofee': 'low','suger': 'low','Tea': 'high','Bread': 'low','Toast': 'low','Rice': 'low','Dall': 'low','Wheat': 'low','Groundnut': 'low','turmuric': 'low','Chilli powder': 'low','Garam masala': 'low','Jeggry': 'low','shampoo': 'high','Face wash': 'high','Matchbox': 'low','Agarabgti': 'high',
          'All-out': 'high','Sanitizer': 'high','hair oil': 'low','powder': 'high','oill': 'low','Biscuit': 'low','Hair-dye': 'high','Maggie': 'high',
          'pasta': 'high','Cream': 'high','Kapoor': 'low','Green tea':'high','Mayo': 'high','popcorn': 'high','papad': 'low','Besan': 'high','soji': 'low','paua': 'low','soyabean': 'high','Harpic': 'high','Had-wash': 'high','water bottle':'low'}



#Computing and labeling age with products

productage=df["Median Age"].to_list()
product_name =df['ProductName'].to_list()

productage = []

ic = 650
id = 700
agelowcount = 0
agehighcount = 0
ageeldercount= 0
productage = productage[ic : id]
product_name = product_name[ic : id]

for i in productage:
    if i <=30:
        agelowcount = agelowcount+1
    elif i>30 and i<=38:
        agehighcount+=1
    else:
        ageeldercount = ageeldercount + 1

if agehighcount > agelowcount:
    productage.append('adult')
else:
    productage.append('kids')

product_age = {product_name[0]:productage[0]}

prod_inc={'Diaper':'kids','soap':'kids','Detergent':'kids','salt':'kids','Toothpaste':'kids','Brush':'kids','Towel':'kids','Bucket':'kids',
           'Mug': 'kids','cup':'kids','cofee': 'kids','suger': 'kids','Tea': 'kids','Bread': 'kids','Toast': 'kids','Rice': 'kids','Dall': 'kids','Wheat': 'kids','Groundnut': 'kids','turmuric': 'kids','Chilli powder': 'kids','Garam masala': 'kids','Jeggry': 'kids','shampoo': 'kids','Face wash': 'kids','Matchbox': 'kids','Agarabgti': 'kids',
           'All-out': 'kids','Sanitizer': 'kids','hair oil': 'kids','powder': 'kids','oill': 'kids','Biscuit': 'kids','Hair-dye': 'kids','Maggie': 'kids',
           'pasta': 'kids','Cream': 'kids','Kapoor': 'kids','Green tea':'kids','Mayo': 'kids','popcorn': 'kids','papad': 'kids','Besan': 'kids','soji': 'kids','paua': 'kids','soyabean': 'kids','Harpic': 'adult','Had-wash': 'kids','water bottle':'kids'}




# Computing and labeling Male & Female Population
productsex=[]
Product_Gender = df['Male Ratio'].to_list()
product_name =df['ProductName'].to_list()

ig = 2400
ih = 2450
femalecount = 0
malecount = 0
productsex = productsex[ig : ih]
product_name = product_name[ig : ih]

for i in productsex:
    if i >=50:
        malecount = malecount+1

else:
    femalecount+=1
    if malecount > femalecount:
        productsex.append('Male')
    else:
        productsex.append('Female')

    product_sex= {product_name[0]:productsex[0]}


prod_sex={'Diaper':'Female','soap':'Female','Detergent':'high','salt':'Female','Toothpaste':'Female','Brush':'Female','Towel':'Female','Bucket':'Female',
                  'Mug': 'Female','cup':'Female','cofee': 'Female','suger': 'Female','Tea': 'Female','Bread': 'Female','Toast': 'Female','Rice': 'Female','Dall': 'Female','Wheat': 'Female','Groundnut': 'Female','turmuric': 'Female','Chilli powder': 'low','Garam masala': 'low','Jeggry': 'low','shampoo': 'high','Face wash': 'high','Matchbox': 'Female','Agarabgti': 'Female',
          'All-out': 'Female','Sanitizer': 'Female','hair oil': 'Female','powder': 'Female','oill': 'Female','Biscuit': 'Female','Hair-dye': 'Female','Maggie': 'Female',
          'pasta': 'Female','Cream': 'Female','Kapoor': 'Female','Green tea':'Female','Mayo': 'Female','popcorn': 'Female','papad': 'Female','Besan': 'Female','soji': 'Female','paua': 'Female','soyabean': 'Female','Harpic': 'Female','Had-wash': 'Female','water bottle':'Female'}




# Product Dictionary with Mrp
product_name =df['ProductName'].to_list()

productnames = product_name[0:2499:50]

ProductPrices = df['mrp'].to_list()

product_mrp = ProductPrices[0:2499:50]

productnames = tuple(productnames)
product_mrp =  tuple(product_mrp)


Pr_dictprice ={productnames:product_mrp}



# Product Dictionary with Cost

productcost = df["costPrice"].to_list()

product_cost = productcost[0:2499:50]

product_cost = tuple(product_cost)


costdict = {productnames : product_cost}

working_capital= {}
space = {}
order_capacity = {}

ranpre = randint(0,10)
ranpro  =randint(20,50)

numpro = ranpro - ranpre
print(numpro)

#print(numpro)

quantity = []

for abc in range(numpro):
    quantity.append(randint(10,50))








res={"revenue":
    {
    "Expected revenue": randint(3000000,4000000),
    "Previous revenue": randint(2000000,3000000),
    },

"Profit":
    {

        "Expected profit": randint(300000,500000),
        "Previous profit": randint(100000,200000),
    },

"order list":
    {
        "ProductName": productnames[ranpre:ranpro],
        "Quantity"   : quantity,
        "Mrp"  : product_mrp[ranpre:ranpro],
        "Cost" : product_cost[ranpre:ranpro]



    }
}
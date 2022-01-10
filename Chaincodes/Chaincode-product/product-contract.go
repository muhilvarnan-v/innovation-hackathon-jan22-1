/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// ProductContract contract for managing CRUD for Product
type ProductContract struct {
	contractapi.Contract
}

// type Catalog struct {
// 	Product_ID     string  `json:"product_id"`
// 	Product_Name   string  `json:"product_name"`
// 	Price_Per_Unit float64 `json:"price_per_unit"`
// 	Number_Of_Unit int     `json:"number_of_unit"`
// 	Seller_ID      string  `json:"seller_id"`
// 	Platform       string  `json:"platform"`
// }

// ProductExists returns true when asset with given ID exists in world state
func (c *ProductContract) ProductExists(ctx contractapi.TransactionContextInterface, Product_ID string) (bool, error) {
	data, err := ctx.GetStub().GetState(Product_ID)

	if err != nil {
		return false, err
	}

	return data != nil, nil
}

// CreateProduct creates a new instance of Product
func (c *ProductContract) CreateProduct(ctx contractapi.TransactionContextInterface, Product_ID string, Product_Name string, Product_Desc string, Retail_Price float64, Selling_Price float64, Units int, Rating float64, SellerName string, Platform string) error {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("the product %s already exists", Product_ID)
	}

	loc, _ := time.LoadLocation("Asia/Kolkata")

	// seller := &Seller{

	// }

	// category := Category{

	// }

	product := &Product{
		Id:            Product_ID,
		Product_Name:  Product_Name,
		Product_Desc:  Product_Desc,
		Retail_Price:  Retail_Price,
		Selling_Price: Selling_Price,
		Units:         Units,
		Rating:        Rating,
		SellerName:    SellerName,
		Platform:      Platform,
		Created_at:    time.Now().In(loc).Format("02/01/2006 03:04:05"),
		Updated_at:    time.Now().In(loc).Format("02/01/2006 03:04:05"),
	}

	bytes, _ := json.Marshal(product)

	return ctx.GetStub().PutState(Product_ID, bytes)

	// product := Catalog{Product_ID, Product_Name, Price_Per_Unit, Number_Of_Unit, Seller_ID, Platform}

	// bytes, _ := json.Marshal(product)

	// return ctx.GetStub().PutState(Product_ID, bytes)
}

// func (c *ProductContract) CreateCategory(ctx contractapi.TransactionContextInterface, Product_ID string, Parent_Category_Name string, Category_Name string) error {
// 	exists, err := c.ProductExists(ctx, Product_ID)
// 	if err != nil {
// 		return fmt.Errorf("could not read from world state. %s", err)
// 	} else if !exists {
// 		return fmt.Errorf("the asset %s doesnot exists", Product_ID)
// 	}

// 	bytes, _ := ctx.GetStub().GetState(Product_ID)

// 	if err != nil {
// 		return err
// 	}

// 	product := new(Product)

// 	err = json.Unmarshal(bytes, &product)

// 	if err != nil {
// 		return fmt.Errorf("could not unmarshal world state data to type product")
// 	}

// 	category := &Category{
// 		Parent_Category_Name: Parent_Category_Name,
// 		Category_Name:        Category_Name,
// 	}

// 	product.Category = category

// 	categorybytes, _ := json.Marshal(product)

// 	return ctx.GetStub().PutState(Product_ID, categorybytes)
// }

// func (c *ProductContract) CreateSeller(ctx contractapi.TransactionContextInterface, Product_ID string, Seller_Id string, Seller_Name string, Seller_Desc string, Platform string, Rating float64) error {
// 	exists, err := c.ProductExists(ctx, Product_ID)
// 	if err != nil {
// 		return fmt.Errorf("could not read from world state. %s", err)
// 	} else if !exists {
// 		return fmt.Errorf("the asset %s doesnot exists", Product_ID)
// 	}

// 	bytes, _ := ctx.GetStub().GetState(Product_ID)

// 	if err != nil {
// 		return err
// 	}

// 	product := new(Product)

// 	err = json.Unmarshal(bytes, &product)

// 	if err != nil {
// 		return fmt.Errorf("could not unmarshal world state data to type product")
// 	}

// 	seller := &Seller{
// 		Id:       Seller_Id,
// 		Name:     Seller_Name,
// 		Desc:     Seller_Desc,
// 		Platform: Platform,
// 		Rating:   Rating,
// 	}

// 	product.Seller = seller

// 	sellerbytes, _ := json.Marshal(product)

// 	return ctx.GetStub().PutState(Product_ID, sellerbytes)
// }

// ReadProduct retrieves an instance of Product from the world state
func (c *ProductContract) ReadProduct(ctx contractapi.TransactionContextInterface, Product_ID string) (*Product, error) {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return nil, fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return nil, fmt.Errorf("the asset %s does not exist", Product_ID)
	}

	bytes, _ := ctx.GetStub().GetState(Product_ID)

	order := new(Product)

	err = json.Unmarshal(bytes, order)

	if err != nil {
		return nil, fmt.Errorf("could not unmarshal world state data to type Product")
	}

	return order, nil
}

func (c *ProductContract) GetPriceById(ctx contractapi.TransactionContextInterface, Product_ID string) (float64, error) {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return 0.0, fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return 0.0, fmt.Errorf("the asset %s does not exist", Product_ID)
	}

	bytes, _ := ctx.GetStub().GetState(Product_ID)

	order := new(Product)

	err = json.Unmarshal(bytes, order)

	if err != nil {
		return 0.0, fmt.Errorf("could not unmarshal world state data to type Product")
	}

	return order.Selling_Price, nil
}

// UpdateProduct retrieves an instance of Product from the world state and updates its value
func (c *ProductContract) UpdateProductUnits(ctx contractapi.TransactionContextInterface, Product_ID string, newNumber_Of_Unit int) error {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the product %s does not exist", Product_ID)
	}

	product, err := c.ReadProduct(ctx, Product_ID)
	if err != nil {
		return err
	}

	product.Units = newNumber_Of_Unit
	productBytes, err := json.Marshal(product)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(Product_ID, productBytes)
}

func (c *ProductContract) UpdateProductPrice(ctx contractapi.TransactionContextInterface, Product_ID string, new_price float64) error {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the product %s does not exist", Product_ID)
	}

	product, err := c.ReadProduct(ctx, Product_ID)
	if err != nil {
		return err
	}

	product.Selling_Price = new_price
	productBytes, err := json.Marshal(product)
	if err != nil {
		return err
	}

	return ctx.GetStub().PutState(Product_ID, productBytes)
}

// DeleteProduct deletes an instance of Product from the world state
func (c *ProductContract) DeleteProduct(ctx contractapi.TransactionContextInterface, Product_ID string) error {
	exists, err := c.ProductExists(ctx, Product_ID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the product %s does not exist", Product_ID)
	}

	return ctx.GetStub().DelState(Product_ID)
}

//search based on the name
func (c *ProductContract) SearchProductByName(ctx contractapi.TransactionContextInterface, Product_Name string) ([]*Product, error) {

	queryString := fmt.Sprintf(`{"selector":{"product_name": "%v"}}`, Product_Name)
	return getSearchResultForQueryString(ctx, queryString)
}

func getSearchResultForQueryString(ctx contractapi.TransactionContextInterface, queryByName string) ([]*Product, error) {

	resultsIterator, err := ctx.GetStub().GetQueryResult(queryByName)
	if err != nil {
		return nil, err
	}
	//defer resultsIterator.Close()

	return constructSearchResponseFromIterator(resultsIterator)
}

func constructSearchResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) ([]*Product, error) {
	var catalog []*Product
	for resultsIterator.HasNext() {
		getSearchResult, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		var Catalog Product
		err = json.Unmarshal(getSearchResult.Value, &Catalog)
		if err != nil {
			return nil, err
		}
		catalog = append(catalog, &Catalog)
	}

	return catalog, nil
}

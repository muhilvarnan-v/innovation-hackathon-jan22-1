/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

//Category data structure
type Category struct {
	Parent_Category_Name string `json:"parent_category_name"`
	Category_Name        string `json:"category_name"`
}

//seller data structure
type Seller struct {
	Id       string  `json:"id"`
	Name     string  `json:"name"`
	Desc     string  `json:"desc"`
	Platform string  `json:"platform"`
	Rating   float64 `json:"rating"`
}

//Product data structure
type Product struct {
	Id            string  `json:"id"`
	Product_Name  string  `json:"product_name"`
	Product_Desc  string  `json:"product_desc"`
	Retail_Price  float64 `json:"retail_price"`
	Selling_Price float64 `json:"selling_price"`
	Units         int     `json:"units"`
	Rating        float64 `json:"rating"`
	SellerName    string  `json:"sellername"`
	Platform      string  `json:"platform"`
	//Category      *Category
	//Seller        *Seller
	Created_at    string `json:"created_at"`
	Updated_at    string `json:"updated_at"`
}

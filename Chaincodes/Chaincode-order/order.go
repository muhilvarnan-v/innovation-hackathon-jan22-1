/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

type Billing struct {
	Name       string `json:"name"`
	Address    string `json:"address"`
	Email      string `json:"email"`
	Phone      string `json:"prone"`
	Tax_Number string `json:"tax_number"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

type Payment struct {
	Method string
	Amount string
	Status string
}

type Fullfilment struct {
	Id              string `json:"id"`
	Provider_Id     string `json:"provider_id"`
	Delivery_Person string `json:"delivery_person"`
}

// Order stores a value
type Order struct {
	// Id          string   `json:"id"`
	// Items       []string `json:"items"`
	// Billing     *Billing
	// Payment     *Payment
	// Fullfilment *Fullfilment
	// Created_at  string `json:"created_at"`
	// Updated_at  string `json:"updated_at"`
	Order_Id   string `json:"order_id"`
	Hash       string `json:"hash"`
	Created_at string `json:"created_at"`
	Updated_at string `json:"updated_at"`
}

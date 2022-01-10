/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// OrderContract contract for managing CRUD for Order
type OrderContract struct {
	contractapi.Contract
}

// OrderExists returns true when asset with given ID exists in world state
func (c *OrderContract) OrderExists(ctx contractapi.TransactionContextInterface, orderID string) (bool, error) {
	data, err := ctx.GetStub().GetState(orderID)

	if err != nil {
		return false, err
	}

	return data != nil, nil
}

// CreateOrder creates a new instance of Order
func (c *OrderContract) CreateOrder(ctx contractapi.TransactionContextInterface, orderID string, hash string) error {
	exists, err := c.OrderExists(ctx, orderID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("the asset %s already exists", orderID)
	}

	loc, _ := time.LoadLocation("Asia/Kolkata")

	order := &Order{
		Order_Id:   orderID,
		Hash:       hash,
		Created_at: time.Now().In(loc).Format("02/01/2006 03:04:05"),
		Updated_at: time.Now().In(loc).Format("02/01/2006 03:04:05"),
	}

	bytes, _ := json.Marshal(order)

	return ctx.GetStub().PutState(orderID, bytes)
}

// func (c *OrderContract) CreateBill(ctx contractapi.TransactionContextInterface, orderID string, name string, address string, email string, phone string, tax_number string) error {
// 	exists, err := c.OrderExists(ctx, orderID)
// 	if err != nil {
// 		return fmt.Errorf("could not read from world state. %s", err)
// 	} else if !exists {
// 		return fmt.Errorf("the asset %s doesnot exists", orderID)
// 	}

// 	loc, _ := time.LoadLocation("Asia/Kolkata")

// 	bytes, _ := ctx.GetStub().GetState(orderID)

// 	if err != nil {
// 		return err
// 	}

// 	order := new(Order)

// 	err = json.Unmarshal(bytes, &order)

// 	if err != nil {
// 		return fmt.Errorf("could not unmarshal world state data to type Tag")
// 	}

// 	bill := &Billing{

// 		Name:       name,
// 		Address:    address,
// 		Email:      email,
// 		Phone:      phone,
// 		Tax_Number: tax_number,
// 		Created_at: time.Now().In(loc).Format("02/01/2006 03:04:05"),
// 		Updated_at: time.Now().In(loc).Format("02/01/2006 03:04:05"),
// 	}

// 	order.Billing = bill

// 	billbytes, _ := json.Marshal(order)

// 	return ctx.GetStub().PutState(orderID, billbytes)
// }

// func (c *OrderContract) CreateFullfilment(ctx contractapi.TransactionContextInterface, orderID string, id string, provider_id string, delivery_person string) error {
// 	exists, err := c.OrderExists(ctx, orderID)
// 	if err != nil {
// 		return fmt.Errorf("could not read from world state. %s", err)
// 	} else if !exists {
// 		return fmt.Errorf("the asset %s doesnot exists", orderID)
// 	}

// 	//loc, _ := time.LoadLocation("Asia/Kolkata")

// 	bytes, _ := ctx.GetStub().GetState(orderID)

// 	if err != nil {
// 		return err
// 	}

// 	order := new(Order)

// 	err = json.Unmarshal(bytes, &order)

// 	if err != nil {
// 		return fmt.Errorf("could not unmarshal world state data to type Tag")
// 	}

// 	fullfilment := &Fullfilment{

// 		Id:              id,
// 		Provider_Id:     provider_id,
// 		Delivery_Person: delivery_person,
// 	}

// 	order.Fullfilment = fullfilment

// 	fullfilbytes, _ := json.Marshal(order)

// 	return ctx.GetStub().PutState(orderID, fullfilbytes)
// }

// func (c *OrderContract) CreatePayment(ctx contractapi.TransactionContextInterface, orderID string, method string, amount string, status string) error {
// 	exists, err := c.OrderExists(ctx, orderID)
// 	if err != nil {
// 		return fmt.Errorf("could not read from world state. %s", err)
// 	} else if !exists {
// 		return fmt.Errorf("the asset %s doesnot exists", orderID)
// 	}

// 	//loc, _ := time.LoadLocation("Asia/Kolkata")

// 	bytes, _ := ctx.GetStub().GetState(orderID)

// 	if err != nil {
// 		return err
// 	}

// 	order := new(Order)

// 	err = json.Unmarshal(bytes, &order)

// 	if err != nil {
// 		return fmt.Errorf("could not unmarshal world state data to type Tag")
// 	}

// 	payment := &Payment{

// 		Method: method,
// 		Amount: amount,
// 		Status: status,
// 	}

// 	order.Payment = payment

// 	paymentbytes, _ := json.Marshal(order)

// 	return ctx.GetStub().PutState(orderID, paymentbytes)
// }

// ReadOrder retrieves an instance of Order from the world state
func (c *OrderContract) ReadOrder(ctx contractapi.TransactionContextInterface, orderID string) (*Order, error) {
	exists, err := c.OrderExists(ctx, orderID)
	if err != nil {
		return nil, fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return nil, fmt.Errorf("the asset %s does not exist", orderID)
	}

	bytes, _ := ctx.GetStub().GetState(orderID)

	order := new(Order)

	err = json.Unmarshal(bytes, order)

	if err != nil {
		return nil, fmt.Errorf("could not unmarshal world state data to type Order")
	}

	return order, nil
}

// UpdateOrder retrieves an instance of Order from the world state and updates its value
func (c *OrderContract) UpdateOrder(ctx contractapi.TransactionContextInterface, orderID string, hash string) error {
	exists, err := c.OrderExists(ctx, orderID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", orderID)
	}

	bytes, _ := ctx.GetStub().GetState(orderID)

	if err != nil {
		return err
	}

	order := new(Order)

	err = json.Unmarshal(bytes, &order)

	if err != nil {
		return fmt.Errorf("could not unmarshal world state data to type Tag")
	}

	loc, _ := time.LoadLocation("Asia/Kolkata")

	order.Hash = hash
	order.Updated_at = time.Now().In(loc).Format("02/01/2006 03:04:05")

	Newbytes, _ := json.Marshal(order)

	return ctx.GetStub().PutState(orderID, Newbytes)
}

// DeleteOrder deletes an instance of Order from the world state
func (c *OrderContract) DeleteOrder(ctx contractapi.TransactionContextInterface, orderID string) error {
	exists, err := c.OrderExists(ctx, orderID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the asset %s does not exist", orderID)
	}

	return ctx.GetStub().DelState(orderID)
}

/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// AggregatedDataContract contract for managing CRUD for AggregatedData
type AggregatedDataContract struct {
	contractapi.Contract
}

func (s *AggregatedDataContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	aggregateddata := []AggregatedData{
		{AggregatedDataID: "dataAgg", MaxOrdersMoved: "", DeliveryMinRating: "", DeliveryMaxRating: "", SellerMinRating: "", SellerMaxRating: "", TotalOrder: "", TotalSales: ""},
	}

	for _, aggregateddataRecord := range aggregateddata {
		aggregateddataJSON, err := json.Marshal(aggregateddata)
		if err != nil {
			return err
		}

		err = ctx.GetStub().PutState(aggregateddataRecord.AggregatedDataID, aggregateddataJSON)
		if err != nil {
			return fmt.Errorf("failed to put to world state. %v", err)
		}
	}

	return nil
}

// AggregatedDataExists returns true when asset with given ID exists in world state
func (c *AggregatedDataContract) AggregatedDataExists(ctx contractapi.TransactionContextInterface, aggregatedDataID string) (bool, error) {
	data, err := ctx.GetStub().GetState(aggregatedDataID)

	if err != nil {
		return false, err
	}

	return data != nil, nil
}

// CreateAggregatedData creates a new instance of AggregatedData
// func (c *AggregatedDataContract) CreateAggregatedData(ctx contractapi.TransactionContextInterface, aggregatedDataID string, value string) error {
// 	exists, err := c.AggregatedDataExists(ctx, aggregatedDataID)
// 	if err != nil {
// 		return fmt.Errorf("Could not read from world state. %s", err)
// 	} else if exists {
// 		return fmt.Errorf("The asset %s already exists", aggregatedDataID)
// 	}

// 	aggregatedData := new(AggregatedData)
// 	aggregatedData.Value = value

// 	bytes, _ := json.Marshal(aggregatedData)

// 	return ctx.GetStub().PutState(aggregatedDataID, bytes)
// }

// ReadAggregatedData retrieves an instance of AggregatedData from the world state
func (c *AggregatedDataContract) ReadAggregatedData(ctx contractapi.TransactionContextInterface, aggregatedDataID string) (string, error) {
	exists, err := c.AggregatedDataExists(ctx, aggregatedDataID)
	if err != nil {
		return "", fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return "", fmt.Errorf("the data %s does not exist", aggregatedDataID)
	}

	bytes, _ := ctx.GetStub().GetState(aggregatedDataID)

	//aggregatedData := new(AggregatedData)

	//err = json.Unmarshal(bytes, aggregatedData)

	if err != nil {
		return "", fmt.Errorf("could not unmarshal world state data to type AggregatedData")
	}

	return string(bytes), nil
}

// UpdateAggregatedData retrieves an instance of AggregatedData from the world state and updates its value
func (c *AggregatedDataContract) UpdateAggregatedData(ctx contractapi.TransactionContextInterface, aggregatedDataID string, MaxOrdersMoved string, DeliveryMinRating string, DeliveryMaxRating string, SellerMinRating string, SellerMaxRating string, TotalOrder string, TotalSales string) error {
	exists, err := c.AggregatedDataExists(ctx, aggregatedDataID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the data %s does not exist", aggregatedDataID)
	}

	aggregatedData := new(AggregatedData)
	aggregatedData.MaxOrdersMoved = MaxOrdersMoved
	aggregatedData.DeliveryMinRating = DeliveryMinRating
	aggregatedData.DeliveryMaxRating = DeliveryMaxRating
	aggregatedData.SellerMinRating = SellerMinRating
	aggregatedData.SellerMaxRating = SellerMaxRating
	//aggregatedData.TotalInventory = TotalInventory
	aggregatedData.TotalOrder = TotalOrder
	aggregatedData.TotalSales = TotalSales

	bytes, _ := json.Marshal(aggregatedData)

	return ctx.GetStub().PutState(aggregatedDataID, bytes)
}

// DeleteAggregatedData deletes an instance of AggregatedData from the world state
func (c *AggregatedDataContract) DeleteAggregatedData(ctx contractapi.TransactionContextInterface, aggregatedDataID string) error {
	exists, err := c.AggregatedDataExists(ctx, aggregatedDataID)
	if err != nil {
		return fmt.Errorf("could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("the data %s does not exist", aggregatedDataID)
	}

	return ctx.GetStub().DelState(aggregatedDataID)
}

/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-contract-api-go/metadata"
)

func main() {
	productContract := new(ProductContract)
	productContract.Info.Version = "0.0.1"
	productContract.Info.Description = "My Smart Contract"
	productContract.Info.License = new(metadata.LicenseMetadata)
	productContract.Info.License.Name = "Apache-2.0"
	productContract.Info.Contact = new(metadata.ContactMetadata)
	productContract.Info.Contact.Name = "John Doe"

	chaincode, err := contractapi.NewChaincode(productContract)
	chaincode.Info.Title = "Chaincode chaincode"
	chaincode.Info.Version = "0.0.1"

	if err != nil {
		panic("Could not create chaincode from ProductContract." + err.Error())
	}

	err = chaincode.Start()

	if err != nil {
		panic("Failed to start chaincode. " + err.Error())
	}
}

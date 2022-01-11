/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-contract-api-go/metadata"
)

func main() {
	orderContract := new(OrderContract)
	orderContract.Info.Version = "0.0.1"
	orderContract.Info.Description = "My Smart Contract"
	orderContract.Info.License = new(metadata.LicenseMetadata)
	orderContract.Info.License.Name = "Apache-2.0"
	orderContract.Info.Contact = new(metadata.ContactMetadata)
	orderContract.Info.Contact.Name = "John Doe"

	chaincode, err := contractapi.NewChaincode(orderContract)
	chaincode.Info.Title = "Chaincode2 chaincode"
	chaincode.Info.Version = "0.0.1"

	if err != nil {
		panic("Could not create chaincode from OrderContract." + err.Error())
	}

	err = chaincode.Start()

	if err != nil {
		panic("Failed to start chaincode. " + err.Error())
	}
}

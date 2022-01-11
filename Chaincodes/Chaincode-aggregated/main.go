/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
	"github.com/hyperledger/fabric-contract-api-go/metadata"
)

func main() {
	aggregatedDataContract := new(AggregatedDataContract)
	aggregatedDataContract.Info.Version = "0.0.1"
	aggregatedDataContract.Info.Description = "My Smart Contract"
	aggregatedDataContract.Info.License = new(metadata.LicenseMetadata)
	aggregatedDataContract.Info.License.Name = "Apache-2.0"
	aggregatedDataContract.Info.Contact = new(metadata.ContactMetadata)
	aggregatedDataContract.Info.Contact.Name = "John Doe"

	chaincode, err := contractapi.NewChaincode(aggregatedDataContract)
	chaincode.Info.Title = "Chaincode-aggregated chaincode"
	chaincode.Info.Version = "0.0.1"

	if err != nil {
		panic("Could not create chaincode from AggregatedDataContract." + err.Error())
	}

	err = chaincode.Start()

	if err != nil {
		panic("Failed to start chaincode. " + err.Error())
	}
}

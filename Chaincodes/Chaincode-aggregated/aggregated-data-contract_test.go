/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

// import (
// 	"encoding/json"
// 	"errors"
// 	"fmt"
// 	"testing"

// 	"github.com/hyperledger/fabric-contract-api-go/contractapi"
// 	"github.com/hyperledger/fabric-chaincode-go/shim"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/mock"
// )

// const getStateError = "world state get error"

// type MockStub struct {
// 	shim.ChaincodeStubInterface
// 	mock.Mock
// }

// func (ms *MockStub) GetState(key string) ([]byte, error) {
// 	args := ms.Called(key)

// 	return args.Get(0).([]byte), args.Error(1)
// }

// func (ms *MockStub) PutState(key string, value []byte) error {
// 	args := ms.Called(key, value)

// 	return args.Error(0)
// }

// func (ms *MockStub) DelState(key string) error {
// 	args := ms.Called(key)

// 	return args.Error(0)
// }

// type MockContext struct {
// 	contractapi.TransactionContextInterface
// 	mock.Mock
// }

// func (mc *MockContext) GetStub() shim.ChaincodeStubInterface {
// 	args := mc.Called()

// 	return args.Get(0).(*MockStub)
// }

// func configureStub() (*MockContext, *MockStub) {
// 	var nilBytes []byte

// 	testAggregatedData := new(AggregatedData)
// 	testAggregatedData.Value = "set value"
// 	aggregatedDataBytes, _ := json.Marshal(testAggregatedData)

// 	ms := new(MockStub)
// 	ms.On("GetState", "statebad").Return(nilBytes, errors.New(getStateError))
// 	ms.On("GetState", "missingkey").Return(nilBytes, nil)
// 	ms.On("GetState", "existingkey").Return([]byte("some value"), nil)
// 	ms.On("GetState", "aggregatedDatakey").Return(aggregatedDataBytes, nil)
// 	ms.On("PutState", mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).Return(nil)
// 	ms.On("DelState", mock.AnythingOfType("string")).Return(nil)

// 	mc := new(MockContext)
// 	mc.On("GetStub").Return(ms)

// 	return mc, ms
// }

// func TestAggregatedDataExists(t *testing.T) {
// 	var exists bool
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(AggregatedDataContract)

// 	exists, err = c.AggregatedDataExists(ctx, "statebad")
// 	assert.EqualError(t, err, getStateError)
// 	assert.False(t, exists, "should return false on error")

// 	exists, err = c.AggregatedDataExists(ctx, "missingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state but no value for key")
// 	assert.False(t, exists, "should return false when no value for key in world state")

// 	exists, err = c.AggregatedDataExists(ctx, "existingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state and value exists for key")
// 	assert.True(t, exists, "should return true when value for key in world state")
// }

// func TestCreateAggregatedData(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(AggregatedDataContract)

// 	err = c.CreateAggregatedData(ctx, "statebad", "some value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.CreateAggregatedData(ctx, "existingkey", "some value")
// 	assert.EqualError(t, err, "The asset existingkey already exists", "should error when exists returns true")

// 	err = c.CreateAggregatedData(ctx, "missingkey", "some value")
// 	stub.AssertCalled(t, "PutState", "missingkey", []byte("{\"value\":\"some value\"}"))
// }

// func TestReadAggregatedData(t *testing.T) {
// 	var aggregatedData *AggregatedData
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(AggregatedDataContract)

// 	aggregatedData, err = c.ReadAggregatedData(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when reading")
// 	assert.Nil(t, aggregatedData, "should not return AggregatedData when exists errors when reading")

// 	aggregatedData, err = c.ReadAggregatedData(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when reading")
// 	assert.Nil(t, aggregatedData, "should not return AggregatedData when key does not exist in world state when reading")

// 	aggregatedData, err = c.ReadAggregatedData(ctx, "existingkey")
// 	assert.EqualError(t, err, "Could not unmarshal world state data to type AggregatedData", "should error when data in key is not AggregatedData")
// 	assert.Nil(t, aggregatedData, "should not return AggregatedData when data in key is not of type AggregatedData")

// 	aggregatedData, err = c.ReadAggregatedData(ctx, "aggregatedDatakey")
// 	expectedAggregatedData := new(AggregatedData)
// 	expectedAggregatedData.Value = "set value"
// 	assert.Nil(t, err, "should not return error when AggregatedData exists in world state when reading")
// 	assert.Equal(t, expectedAggregatedData, aggregatedData, "should return deserialized AggregatedData from world state")
// }

// func TestUpdateAggregatedData(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(AggregatedDataContract)

// 	err = c.UpdateAggregatedData(ctx, "statebad", "new value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when updating")

// 	err = c.UpdateAggregatedData(ctx, "missingkey", "new value")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when updating")

// 	err = c.UpdateAggregatedData(ctx, "aggregatedDatakey", "new value")
// 	expectedAggregatedData := new(AggregatedData)
// 	expectedAggregatedData.Value = "new value"
// 	expectedAggregatedDataBytes, _ := json.Marshal(expectedAggregatedData)
// 	assert.Nil(t, err, "should not return error when AggregatedData exists in world state when updating")
// 	stub.AssertCalled(t, "PutState", "aggregatedDatakey", expectedAggregatedDataBytes)
// }

// func TestDeleteAggregatedData(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(AggregatedDataContract)

// 	err = c.DeleteAggregatedData(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.DeleteAggregatedData(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when deleting")

// 	err = c.DeleteAggregatedData(ctx, "aggregatedDatakey")
// 	assert.Nil(t, err, "should not return error when AggregatedData exists in world state when deleting")
// 	stub.AssertCalled(t, "DelState", "aggregatedDatakey")
// }

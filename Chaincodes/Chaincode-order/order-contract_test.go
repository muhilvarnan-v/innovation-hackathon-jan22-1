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

// 	testOrder := new(Order)
// 	testOrder.Value = "set value"
// 	orderBytes, _ := json.Marshal(testOrder)

// 	ms := new(MockStub)
// 	ms.On("GetState", "statebad").Return(nilBytes, errors.New(getStateError))
// 	ms.On("GetState", "missingkey").Return(nilBytes, nil)
// 	ms.On("GetState", "existingkey").Return([]byte("some value"), nil)
// 	ms.On("GetState", "orderkey").Return(orderBytes, nil)
// 	ms.On("PutState", mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).Return(nil)
// 	ms.On("DelState", mock.AnythingOfType("string")).Return(nil)

// 	mc := new(MockContext)
// 	mc.On("GetStub").Return(ms)

// 	return mc, ms
// }

// func TestOrderExists(t *testing.T) {
// 	var exists bool
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(OrderContract)

// 	exists, err = c.OrderExists(ctx, "statebad")
// 	assert.EqualError(t, err, getStateError)
// 	assert.False(t, exists, "should return false on error")

// 	exists, err = c.OrderExists(ctx, "missingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state but no value for key")
// 	assert.False(t, exists, "should return false when no value for key in world state")

// 	exists, err = c.OrderExists(ctx, "existingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state and value exists for key")
// 	assert.True(t, exists, "should return true when value for key in world state")
// }

// func TestCreateOrder(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(OrderContract)

// 	err = c.CreateOrder(ctx, "statebad", "some value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.CreateOrder(ctx, "existingkey", "some value")
// 	assert.EqualError(t, err, "The asset existingkey already exists", "should error when exists returns true")

// 	err = c.CreateOrder(ctx, "missingkey", "some value")
// 	stub.AssertCalled(t, "PutState", "missingkey", []byte("{\"value\":\"some value\"}"))
// }

// func TestReadOrder(t *testing.T) {
// 	var order *Order
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(OrderContract)

// 	order, err = c.ReadOrder(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when reading")
// 	assert.Nil(t, order, "should not return Order when exists errors when reading")

// 	order, err = c.ReadOrder(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when reading")
// 	assert.Nil(t, order, "should not return Order when key does not exist in world state when reading")

// 	order, err = c.ReadOrder(ctx, "existingkey")
// 	assert.EqualError(t, err, "Could not unmarshal world state data to type Order", "should error when data in key is not Order")
// 	assert.Nil(t, order, "should not return Order when data in key is not of type Order")

// 	order, err = c.ReadOrder(ctx, "orderkey")
// 	expectedOrder := new(Order)
// 	expectedOrder.Value = "set value"
// 	assert.Nil(t, err, "should not return error when Order exists in world state when reading")
// 	assert.Equal(t, expectedOrder, order, "should return deserialized Order from world state")
// }

// func TestUpdateOrder(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(OrderContract)

// 	err = c.UpdateOrder(ctx, "statebad", "new value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when updating")

// 	err = c.UpdateOrder(ctx, "missingkey", "new value")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when updating")

// 	err = c.UpdateOrder(ctx, "orderkey", "new value")
// 	expectedOrder := new(Order)
// 	expectedOrder.Value = "new value"
// 	expectedOrderBytes, _ := json.Marshal(expectedOrder)
// 	assert.Nil(t, err, "should not return error when Order exists in world state when updating")
// 	stub.AssertCalled(t, "PutState", "orderkey", expectedOrderBytes)
// }

// func TestDeleteOrder(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(OrderContract)

// 	err = c.DeleteOrder(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.DeleteOrder(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when deleting")

// 	err = c.DeleteOrder(ctx, "orderkey")
// 	assert.Nil(t, err, "should not return error when Order exists in world state when deleting")
// 	stub.AssertCalled(t, "DelState", "orderkey")
// }

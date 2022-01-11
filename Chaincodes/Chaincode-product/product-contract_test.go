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

// 	testProduct := new(Product)
// 	testProduct.Value = "set value"
// 	productBytes, _ := json.Marshal(testProduct)

// 	ms := new(MockStub)
// 	ms.On("GetState", "statebad").Return(nilBytes, errors.New(getStateError))
// 	ms.On("GetState", "missingkey").Return(nilBytes, nil)
// 	ms.On("GetState", "existingkey").Return([]byte("some value"), nil)
// 	ms.On("GetState", "productkey").Return(productBytes, nil)
// 	ms.On("PutState", mock.AnythingOfType("string"), mock.AnythingOfType("[]uint8")).Return(nil)
// 	ms.On("DelState", mock.AnythingOfType("string")).Return(nil)

// 	mc := new(MockContext)
// 	mc.On("GetStub").Return(ms)

// 	return mc, ms
// }

// func TestProductExists(t *testing.T) {
// 	var exists bool
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(ProductContract)

// 	exists, err = c.ProductExists(ctx, "statebad")
// 	assert.EqualError(t, err, getStateError)
// 	assert.False(t, exists, "should return false on error")

// 	exists, err = c.ProductExists(ctx, "missingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state but no value for key")
// 	assert.False(t, exists, "should return false when no value for key in world state")

// 	exists, err = c.ProductExists(ctx, "existingkey")
// 	assert.Nil(t, err, "should not return error when can read from world state and value exists for key")
// 	assert.True(t, exists, "should return true when value for key in world state")
// }

// func TestCreateProduct(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(ProductContract)

// 	err = c.CreateProduct(ctx, "statebad", "some value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.CreateProduct(ctx, "existingkey", "some value")
// 	assert.EqualError(t, err, "The asset existingkey already exists", "should error when exists returns true")

// 	err = c.CreateProduct(ctx, "missingkey", "some value")
// 	stub.AssertCalled(t, "PutState", "missingkey", []byte("{\"value\":\"some value\"}"))
// }

// func TestReadProduct(t *testing.T) {
// 	var product *Product
// 	var err error

// 	ctx, _ := configureStub()
// 	c := new(ProductContract)

// 	product, err = c.ReadProduct(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when reading")
// 	assert.Nil(t, product, "should not return Product when exists errors when reading")

// 	product, err = c.ReadProduct(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when reading")
// 	assert.Nil(t, product, "should not return Product when key does not exist in world state when reading")

// 	product, err = c.ReadProduct(ctx, "existingkey")
// 	assert.EqualError(t, err, "Could not unmarshal world state data to type Product", "should error when data in key is not Product")
// 	assert.Nil(t, product, "should not return Product when data in key is not of type Product")

// 	product, err = c.ReadProduct(ctx, "productkey")
// 	expectedProduct := new(Product)
// 	expectedProduct.Value = "set value"
// 	assert.Nil(t, err, "should not return error when Product exists in world state when reading")
// 	assert.Equal(t, expectedProduct, product, "should return deserialized Product from world state")
// }

// func TestUpdateProduct(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(ProductContract)

// 	err = c.UpdateProduct(ctx, "statebad", "new value")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors when updating")

// 	err = c.UpdateProduct(ctx, "missingkey", "new value")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when updating")

// 	err = c.UpdateProduct(ctx, "productkey", "new value")
// 	expectedProduct := new(Product)
// 	expectedProduct.Value = "new value"
// 	expectedProductBytes, _ := json.Marshal(expectedProduct)
// 	assert.Nil(t, err, "should not return error when Product exists in world state when updating")
// 	stub.AssertCalled(t, "PutState", "productkey", expectedProductBytes)
// }

// func TestDeleteProduct(t *testing.T) {
// 	var err error

// 	ctx, stub := configureStub()
// 	c := new(ProductContract)

// 	err = c.DeleteProduct(ctx, "statebad")
// 	assert.EqualError(t, err, fmt.Sprintf("Could not read from world state. %s", getStateError), "should error when exists errors")

// 	err = c.DeleteProduct(ctx, "missingkey")
// 	assert.EqualError(t, err, "The asset missingkey does not exist", "should error when exists returns true when deleting")

// 	err = c.DeleteProduct(ctx, "productkey")
// 	assert.Nil(t, err, "should not return error when Product exists in world state when deleting")
// 	stub.AssertCalled(t, "DelState", "productkey")
// }

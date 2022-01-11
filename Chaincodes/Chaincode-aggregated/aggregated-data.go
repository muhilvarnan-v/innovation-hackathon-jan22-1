/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

// AggregatedData stores a value
type AggregatedData struct {
	AggregatedDataID  string `json:"aggregateddatadid"`
	MaxOrdersMoved    string `json:"maxordersmoved"`
	DeliveryMinRating string `json:"deliveryminrating"`
	DeliveryMaxRating string `json:"deliverymaxrating"`
	SellerMinRating   string `json:"sellerminrating"`
	SellerMaxRating   string `json:"sellermaxrating"`
	//TotalInventory    string `json:"totalinventory"`
	TotalOrder        string `json:"totalorder"`
	TotalSales        string `json:"totalsales"`
}

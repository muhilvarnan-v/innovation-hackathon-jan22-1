package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"os"
	"strconv"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

type Locations [][]string

type SampleLocations struct {
	Locations Locations `json:"locations"`
}

func main() {
	fileName := "sample.json"
	data, err := os.ReadFile(fileName)
	check(err)

	sampleLocations := SampleLocations{}
	err = json.Unmarshal(data, &sampleLocations)
	check(err)

	locations := sampleLocations.Locations
	min := 5
	max := len(locations)
	iteration := 100
	testData := make([]Locations, 0, iteration)

	for i := 0; i < iteration; i++ {
		randomBetweenMinAndMax := int(float64(min) + rand.Float64()*float64(max-min))
		dest := make(Locations, len(locations))
		perm := rand.Perm(len(locations))
		for i, v := range perm {
			dest[v] = locations[i]
		}
		locations = dest
		testData = append(testData, locations[:randomBetweenMinAndMax])
	}
	//fmt.Printf("%s", testData)

	fileNamePrefix := "test-data-for"
	f1, err := os.Create(fmt.Sprintf("%s-BasicRouteOptmizationAPI.sh", fileNamePrefix))
	check(err)

	defer f1.Close()

	output := curlForGetCall(testData)
	_, err = f1.Write([]byte(output))
	check(err)

	f2, err := os.Create(fmt.Sprintf("%s-MultiAgentAPI.sh", fileNamePrefix))
	check(err)

	defer f2.Close()

	output = curlForPostCall(testData, 4)
	_, err = f2.Write([]byte(output))
	check(err)

	f3, err := os.Create(fmt.Sprintf("%s-MultiPointDeliveryAPI.sh", fileNamePrefix))
	check(err)

	defer f3.Close()

	output = curlForMultiDeliveryPostCall(testData)
	_, err = f3.Write([]byte(output))
	check(err)
}

func curlForGetCall(testData []Locations) string {
	output := ""
	for _, test := range testData {
		acc := ""
		for _, loc := range test {
			connector := ";"
			if acc == "" {
				connector = ""
			}
			acc = fmt.Sprintf("%s%s%s,%s", acc, connector, loc[2], loc[1])
		}
		output = output + fmt.Sprintf("curl '%s%s'\n", "http://34.87.89.141:8080/route/optimize/driving?locations=", acc)
	}
	return output
}

func curlForMultiDeliveryPostCall(testData []Locations) string {
	output := ""
	for _, test := range testData {
		orderLocations := make([]OrderLocations, 0)
		for i := range rand.Perm(len(test)) {
			if i == 0 || i == 1 {
				continue
			}
			lon, _ := strconv.ParseFloat(test[i][2], 10)
			lat, _ := strconv.ParseFloat(test[i][1], 10)
			dropLocation := OrderLocation{
				Address:   test[i][0],
				Longitude: lon,
				Latitude:  lat,
			}
			newIndex := i / 2
			lon, _ = strconv.ParseFloat(test[newIndex][2], 10)
			lat, _ = strconv.ParseFloat(test[newIndex][1], 10)

			sourceLocation := OrderLocation{
				Address:   test[newIndex][0],
				Longitude: lon,
				Latitude:  lat,
			}
			locations := OrderLocations{
				Pickup: sourceLocation,
				Drop:   dropLocation,
			}
			orderLocations = append(orderLocations, locations)
		}

		request := MultiDeliveryPostRequest{
			OrderLocations: orderLocations,
			Criteria:       "distance",
		}
		reqString, _ := json.Marshal(request)
		output = output + fmt.Sprintf("%s'%s'\n", "curl --location --request POST 'http://34.87.89.141:8080/route/optimize/multi-delivery/driving' --header 'Content-Type: application/json' --data-raw ", string(reqString))
	}
	return output
}

func curlForPostCall(testData []Locations, maxAgents int) string {
	output := ""
	for _, test := range testData {
		orderLocations := make([]OrderLocation, 0)
		for _, loc := range test {
			lon, _ := strconv.ParseFloat(loc[2], 10)
			lat, _ := strconv.ParseFloat(loc[1], 10)
			location := OrderLocation{
				Address:   loc[0],
				Longitude: lon,
				Latitude:  lat,
			}
			orderLocations = append(orderLocations, location)
		}
		noOfAgentsWithMax := rand.Intn(maxAgents) + 1
		request := PostRequest{
			OrderLocations: orderLocations,
			Criteria:       "distance",
			NoOfAgents:     noOfAgentsWithMax,
		}
		reqString, _ := json.Marshal(request)
		output = output + fmt.Sprintf("%s'%s'\n", "curl --location --request POST 'http://34.87.89.141:8080/route/optimize/multi-agent/driving' --header 'Content-Type: application/json' --data-raw ", string(reqString))
	}
	return output
}

type PostRequest struct {
	OrderLocations []OrderLocation `json:"orderLocations"`
	Criteria       string          `json:"criteria"`
	NoOfAgents     int             `json:"no_of_agents"`
}
type OrderLocation struct {
	Address   string  `json:"address"`
	Longitude float64 `json:"longitude"`
	Latitude  float64 `json:"latitude"`
}

type MultiDeliveryPostRequest struct {
	OrderLocations []OrderLocations `json:"orderLocations"`
	Criteria       string           `json:"criteria"`
}
type OrderLocations struct {
	Pickup OrderLocation `json:"pickup"`
	Drop   OrderLocation `json:"drop"`
}

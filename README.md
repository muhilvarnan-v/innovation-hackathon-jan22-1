# The Quad Delivery Route Optimizer

For all the details about the problem, solution, please [refer](./The_Quad_Delivery_Route_Optimizer.pdf) this document.

### PPT

Refer [here](The_Quad_Presentation.pdf)

### Link to Video

https://youtu.be/FDHu54czTfw

### Accessing the APIs

Please refer the publicly hosted application [here](http://34.87.89.141:8080/swagger-ui/#/route-controller)

### Test Dataset

We have pushed test data [here](./test-dataset). Please refer the sh files.

To generate test-dataset for your sample inputs, please update the `sample.json` with list of locations where each location is name, lat, long. And run `go run test-data-generator.go`

## Local Setup

#### Using Java 8 and gradle
In order to run the application,

```sh
./gradlew run
```

#### Docker

In order to run the application,

```sh
docker run -it -p 8080:8080 dineshba/route-optimizer
```


In order to build locally and run the application,

```sh
docker build -t route-optimizer .
docker run -it -p 8080:8080 route-optimizer
```
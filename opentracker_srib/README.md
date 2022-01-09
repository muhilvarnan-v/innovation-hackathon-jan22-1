# Instructions to build.

### Generic command syntax from current folder.

```
$docker build -f opentracker/DockerFile --build-arg profile=<profile> --build-arg version=0.0.1 -t <image_name> .
$docker run -p <hostport>:<containerport> <image_name>
```
##### Actual command to run in current folder

```
$docker build -f opentracker/DockerFile --build-arg profile=stage --build-arg version=0.0.1 -t opentracker:0.0.1 .
$docker run -p 8090:8090 opentracker:0.0.1

```


### Steps to verify the tracking solution.

1. Load given url order tracking page in chrome browser : http://ondc-lb-908778950.ap-south-1.elb.amazonaws.com/index.html?trackingId=453
	This fetches the start and end location and shows on maps the route connecting start and end.
2. Update the delivery location for particular order:
	http://ondc-lb-908778950.ap-south-1.elb.amazonaws.com/deliveryagentupdate.html

	Delivery agents cordinates which we can use to update the path for tracking ID:453
	latitude, longitude
	12.95923, 77.60571
	12.96617, 77.60656
	12.97286, 77.60845
3. If you are doing above, we can see the updation of delivery agent location without you refreshing "order tracking page"
4. Test data of 100 tracking ids also can be seen. trackingId starts from 1 to 100. http://ondc-lb-908778950.ap-south-1.elb.amazonaws.com/index.html?trackingId=< 1 to 100> 


### Technologies used for showing map.

1. Leaflet (https://leafletjs.com/examples.html) is the leading open-source JavaScript library for mobile-friendly interactive map developed using OSM(open streat map : https://wiki.openstreetmap.org/).
2. Leaflet Routing Machine is plugin developed on top of leaflet library to calculate and show the routes. (https://www.liedman.net/leaflet-routing-machine/tutorials/basic-usage/)


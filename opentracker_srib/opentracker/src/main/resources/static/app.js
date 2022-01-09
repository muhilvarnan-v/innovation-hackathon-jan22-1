	var serverUrl="";
	var stompClient = null;

	// Socket to listen to the change in delivery location for given delivery tracking ID.
	function connect() {
		var socket = new SockJS('/locationUpdate-websocket');
		stompClient = Stomp.over(socket);

		stompClient.connect({}, function (frame) {
			console.log('Connected: ' + frame);
			stompClient.subscribe('/topic/updateLocation/'+getQueryVariable("trackingId"), function (message) {
				updateDeliveryAgeentLocation(JSON.parse(message.body)['deliverAgent']);
			});
		});
	}

	// Updates to delivery marker to new location
	function updateDeliveryAgeentLocation(location) {
		var newLatLng = new L.LatLng(location['latitude'], location['longitude']);
		delivery_marker.setLatLng(newLatLng);
	}

connect()

	function disconnect() {
		if (stompClient !== null) {
			stompClient.disconnect();
		}
		console.log("Disconnected");
	}

	// Gets query parameter associated with given key (variable) from the loaded web url
	function getQueryVariable(variable) {
	  var query = window.location.search.substring(1);
	  var vars = query.split("&");
	  for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {
		  return pair[1];
		}
	  }
	}

	/*
	* Gets Start and end longitude for given trackingId.
	*/
	function getDetailsFororder() {
		let surl = serverUrl+"/track/trackInfo-by-id?trackingId="+getQueryVariable("trackingId");
		console.log("final get url = "+surl.toString());
		$.ajax({
			url: surl,
			type: "GET",
			crossDomain: false,
			headers: {
			  'Access-Control-Allow-Origin':'*'
			},
			success: function(data) {
				console.log(data)

				var startlat=data['buyer']['latitude'];
				var startlon=data['buyer']['longitude'];
				var endlat=data['seller']['latitude'];
				var endlon=data['seller']['longitude'];
				var dellat=data['deliverAgent']['latitude'];
				var dellon=data['deliverAgent']['longitude'];
				loadMap(startlat, startlon, endlat, endlon, dellat, dellon);
				console.log(startlat);
			},
			error: function (err) {
				console.log(err.statusText)
			}
		})
	}

	let delivery_marker;
	// Shows patch from start to end. Marks delivery agent as well.
	function loadMap(startlat, startlon, endlat, endlon, dellat, dellon) {
		var map = L.map('map');

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);


		// Routing machine to draw route from given waypoints.
		L.Routing.control({
			waypoints: [
				L.latLng(startlat, startlon),
				L.latLng(endlat, endlon)
			],routeWhileDragging: false // true: if set to true then marker can be dragged and changed. false: doesn't allow user viewing to change to start and end points.
			, addWaypoints:false // false: Avoids adding new add points if clicked on map.
			, show:false  // hides popup that come at top right corner
		}).addTo(map);


		//Custom marker 
		var LeafIcon = L.Icon.extend({
			options: {
				iconSize:     [20, 20],
				iconAnchor:   [0, 15],
				popupAnchor:  [0, 0]
			}
		});

		var delivery_icon = new LeafIcon({iconUrl: 'sam_truck_icon.png'});

		delivery_marker  = L.marker([dellat, dellon], {icon:delivery_icon}).addTo(map).bindPopup('Item currently at ('+dellat.toString()+", "+dellon.toString()+")").openPopup();

		// Temp code not required. Just for dev purpose
		var popup = L.popup();

		function onMapClick(e) {
			popup
			.setLatLng(e.latlng)
			.setContent('You clicked the map at ' + e.latlng.toString())
			.openOn(map);
		}

		map.on('click', onMapClick);
	}

getDetailsFororder();

/*
	function loadmapWithtempData(){
		//12.991344, 77.690163
		let lat = 12.947094;
		let lon= 77.607972;

		let lat1 = 12.991344;
		let lon1 = 77.690163;

		// Delhi :  27.877994, 76.007811
		let lat2 = 27.877994;
		let lon2 = 76.007811;

		// MP: 20.340402, 76.59668
		// MP on route 21.94305, 75.27832
		let latm = 21.94305;
		let lonm = 75.27832;

		// bangalore mahadevapura 7th main : 12.99193, 77.68853
		let latmah7 = 12.99193;
		let lonmah7 = 77.68853;

		// bangalore marthahalli ezone sports : 12.96303, 77.70276
		let latez = 12.96303;
		let lonez = 77.70276;

		// marker for short distance : 77.680856, 13.000269
		// 12.9788, 77.69497
		//12.98971, 77.6887
		let latms = 12.98971;
		let lonms = 77.6887;

		let intervalID;
		let temsiz = 0;
		// 12.98587, 77.69094  -> 12.98294, 77.69265 -> 12.97842, 77.69548 -> 12.97198, 77.69935  -> 12.96705, 77.70209
		const lats = new Array(12.98587, 12.98294,  12.97842, 12.97198, 12.96705);
		const lons = new Array(77.69094, 77.69265, 77.69548, 77.69935, 77.70209);

		loadMap(latmah7, lonmah7, latez, lonez, latms, lonms);

		repeatEverySecond();

		function repeatEverySecond() {
		  intervalID = setInterval(tempUpdatedeliveryAgent, 1000);
		}


		function tempUpdatedeliveryAgent() {
			if (temsiz < lats.length) {
				var newLatLng = new L.LatLng(lats[temsiz], lons[temsiz]);
				delivery_marker.setLatLng(newLatLng);
				temsiz = temsiz + 1;
				console.log("One second elapsed.");
			} else {
				console.log("One second elapsed. without marker");
			}
		}
	}
//loadmapWithtempData();

*/
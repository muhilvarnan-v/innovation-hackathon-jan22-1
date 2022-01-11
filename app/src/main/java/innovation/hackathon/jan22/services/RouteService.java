package innovation.hackathon.jan22.services;

import innovation.hackathon.jan22.api.request.MultiAgentRouteRequest;
import innovation.hackathon.jan22.api.request.MultiDeliveryRouteRequest;
import innovation.hackathon.jan22.api.request.OrderLocation;
import innovation.hackathon.jan22.api.response.RouteTableResponse;
import innovation.hackathon.jan22.api.response.TripResponse;
import innovation.hackathon.jan22.maps.dijkstra.Node;
import innovation.hackathon.jan22.maps.providers.IRoutingEngine;
import innovation.hackathon.jan22.maps.providers.OpenStreetMapsEngine;
import innovation.hackathon.jan22.maps.spanningtree.Edge;
import innovation.hackathon.jan22.maps.spanningtree.SpanningTree;
import innovation.hackathon.jan22.model.LocationNode;
import innovation.hackathon.jan22.model.Place;
import innovation.hackathon.jan22.model.Places;
import innovation.hackathon.jan22.model.WayPoint;

import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

public class RouteService {
    IRoutingEngine openStreetMapsEngine = new OpenStreetMapsEngine();

    public Places getOptimizedRoute(String locationsString, String profile) {
        Places places = getPlaces(locationsString);
        return routeForSingleDeliveryAgent(places, profile);
    }

    public List<Places> getOptimizedRouteForMultiAgentDelivery(MultiAgentRouteRequest multiAgentRouteRequest, String profile) {
        Places places = new Places(multiAgentRouteRequest.getOrderLocations());
        if (multiAgentRouteRequest.getNoOfDeliveryAgents() == 1) {
            return Collections.singletonList(routeForSingleDeliveryAgent(places, profile));
        } else {
            RouteTableResponse response = openStreetMapsEngine.getTableRoute(profile, places);
            List<List<Double>> weights = multiAgentRouteRequest.getCriteria().equals("distance") ? response.getDistances() : response.getDurations();
            Map<List<Place>, Double> weightMapForPlaces = buildWeightMapForPlaces(multiAgentRouteRequest.getOrderLocations(), weights);
            List<List<Edge>> groupOfEdges = groupPlaces(response, weights, multiAgentRouteRequest.getNoOfDeliveryAgents());
            List<List<Place>> groupOfPlaces = mapEdgeToPlaces(groupOfEdges, places);
            List<Places> groupOfPlacesWithSource = addSourceToGroup(groupOfPlaces, places.get(0));

            return groupOfPlacesWithSource.stream()
                    .map(g -> {
                        List<Node> nodes = constructGraph(g, weightMapForPlaces);
                        return new Places(start(nodes.get(0)).stream().map(Node::getPlace).collect(Collectors.toList()));
                    }).collect(Collectors.toList());
        }
    }

    private Map<List<Place>, Double> buildWeightMapForPlaces(List<Place> places, List<List<Double>> weights) {
        Map<List<Place>, Double> weightMap = new HashMap<>();
        for (int sourceIndex = 0; sourceIndex < places.size(); sourceIndex++) {
            for (int destinationIndex = 0; destinationIndex < places.size(); destinationIndex++) {
                weightMap.put(asList(places.get(sourceIndex), places.get(destinationIndex)), weights.get(sourceIndex).get(destinationIndex));
            }
        }
        return weightMap;
    }

    public Places getOptimizedRouteForMultiPointDelivery(MultiDeliveryRouteRequest multiDeliveryRouteRequest, String profile) {
        Places places = multiDeliveryRouteRequest.allPlaces();
        RouteTableResponse response = openStreetMapsEngine.getTableRoute(profile, places);
        List<List<Double>> weights = multiDeliveryRouteRequest.getCriteria().equals("distance") ? response.getDistances() : response.getDurations();
        Map<OrderLocation, Double> weightMap = buildWeightMap(multiDeliveryRouteRequest.getOrderLocations(), weights);

        Places visitedPlaces = new Places(new ArrayList<>());
        Places unvisitedPlaces = multiDeliveryRouteRequest.allPickupPlaces();
        Place currentPlace = findPickupPlaceClosestToDeliveryPartnerLocation(unvisitedPlaces, multiDeliveryRouteRequest.getDeliveryPersonLocation());

        while (!unvisitedPlaces.isEmpty()) {
            visitedPlaces.add(currentPlace);
            unvisitedPlaces.remove(currentPlace);
            Place dropPlaceOfCurrentPlace = multiDeliveryRouteRequest.dropPlaceOf(currentPlace);
            if (dropPlaceOfCurrentPlace != null) {
                unvisitedPlaces.add(dropPlaceOfCurrentPlace);
            }
            currentPlace = nextNearestPlace(currentPlace, unvisitedPlaces, weightMap);
        }
        return visitedPlaces;
    }


    private Map<OrderLocation, Double> buildWeightMap(List<OrderLocation> orderLocations, List<List<Double>> weights) {
        Map<OrderLocation, Double> weightMap = new HashMap<>();
        for (int sourceIndex = 0; sourceIndex < weights.size(); sourceIndex++) {
            for (int destinationIndex = 0; destinationIndex < weights.get(sourceIndex).size(); destinationIndex++) {
                Double weight = weights.get(sourceIndex).get(destinationIndex);
                Place sourcePlace = (sourceIndex % 2 == 0) ?
                        orderLocations.get(sourceIndex / 2).getPickup() :
                        orderLocations.get((sourceIndex - 1) / 2).getDrop();
                Place destinationPlace = (destinationIndex % 2 == 0) ?
                        orderLocations.get(destinationIndex / 2).getPickup() :
                        orderLocations.get((destinationIndex - 1) / 2).getDrop();
                weightMap.put(new OrderLocation(sourcePlace, destinationPlace), weight);
            }
        }
        return weightMap;
    }

    private Place findPickupPlaceClosestToDeliveryPartnerLocation(Places pickupPlaces, Place deliveryPersonLocation) {
        return pickupPlaces.get(0);
    }

    private List<Places> addSourceToGroup(List<List<Place>> groupOfPlaces, Place source) {
        return groupOfPlaces.stream()
                .peek(group -> group.addAll(0, Collections.singletonList(source)))
                .map(Places::new).collect(Collectors.toList());
    }

    private Places routeForSingleDeliveryAgent(Places places, String profile) {
        TripResponse tripResponse = openStreetMapsEngine.getOptimizedRoute(profile, places);
        int noOfWayPoints = tripResponse.getWaypoints().size();
        Map<Integer, Place> optimizedRouteMap = new HashMap<>();
        for (int index = 0; index < noOfWayPoints; index++) {
            WayPoint wayPoint = tripResponse.getWaypoints().get(index);
            optimizedRouteMap.put(wayPoint.getWayPointIndex(), places.get(index));
        }
        List<Place> placesInOptimizedRoute = new ArrayList<>();
        for (int index = 0; index < noOfWayPoints; index++) {
            placesInOptimizedRoute.add(optimizedRouteMap.get(index));
        }
        return new Places(placesInOptimizedRoute);
    }

    private Places getPlaces(String locations) {
        String[] locationsArray = locations.split(";");
        return new Places(Arrays.stream(locationsArray).map(location -> {
            String[] longLatPair = location.split(",");
            return new Place(longLatPair[0], longLatPair[1]);
        }).collect(Collectors.toList()));
    }

    private List<List<Place>> mapEdgeToPlaces(List<List<Edge>> groups, Places places) {
        List<List<Place>> result = groups.stream().map(
                group -> group.stream()
                        .map(g -> asList(g.src, g.dest))
                        .flatMap(List::stream)
                        .filter(x -> x != 0)
                        .distinct()
                        .map(places::get).collect(Collectors.toList())).collect(Collectors.toList());
        List<List<Place>> resultWithRepeatedPlacesRemoved = new ArrayList<>();
        List<Place> usedPlaces = new ArrayList<>();
        for (List<Place> r : result) {
            List<Place> unusedPlaces = r.stream().filter(x -> !usedPlaces.contains(x)).collect(Collectors.toList());
            if (unusedPlaces.isEmpty()) continue;
            resultWithRepeatedPlacesRemoved.add(unusedPlaces);
            usedPlaces.addAll(unusedPlaces);
        }
        return resultWithRepeatedPlacesRemoved;
    }

    private List<List<Edge>> groupPlaces(RouteTableResponse response, List<List<Double>> weights, int count) {

        List<LocationNode> sources = response.getSources();
        List<LocationNode> destinations = response.getDestinations();

        int V = sources.size(); // Number of vertices in graph
        int E = (sources.size() - 1) * (sources.size()); // Number of edges in graph
        SpanningTree spanningTree = new SpanningTree(V, E);


        int edgeIndex = 0;
        for (int sourceIndex = 0; sourceIndex < sources.size(); sourceIndex++) {
            for (int destinationIndex = 0; destinationIndex < destinations.size(); destinationIndex++) {
                if (sourceIndex != destinationIndex) {
                    Edge edge = new Edge(sourceIndex, destinationIndex, weights.get(sourceIndex).get(destinationIndex).intValue());
                    spanningTree.edge[edgeIndex] = edge;
                    edgeIndex++;
                }
            }
        }
        Edge[] edges = spanningTree.KruskalMST();

        Arrays.sort(edges);

        List<List<Edge>> result = new ArrayList<>();
        List<Edge> usedEdges = new ArrayList<>();

        int lastIndex = 1;
        while (count > 1) {
            Edge lastEdge = unusedLastEdge(edges, lastIndex, usedEdges);
            List<Edge> relatedToLast = relatedEdges(lastEdge, Arrays.stream(edges).collect(Collectors.toList()));
            result.add(relatedToLast);
            usedEdges.addAll(relatedToLast);
            count--;
            lastIndex++;
        }

        List<Edge> otherEdges = Arrays.stream(edges).filter(edge -> !usedEdges.contains(edge)).collect(Collectors.toList());
        result.add(otherEdges);
        return result;
    }

    private Edge unusedLastEdge(Edge[] edges, int lastIndex, List<Edge> usedEdges) {
        Edge edge = edges[edges.length - lastIndex];
        while (usedEdges.contains(edge)) {
            lastIndex++;
            if (lastIndex < 0) {
                return null;
            }
            edge = edges[edges.length - lastIndex];
        }
        return edge;
    }

    private List<Edge> relatedEdges(Edge edge, List<Edge> edges) {
        ArrayList<Edge> result = new ArrayList<>();
        result.add(edge);
        List<Edge> related = edges.stream().filter(e -> e.src == edge.src).filter(e -> e.dest != edge.dest).collect(Collectors.toList());
        if (related.isEmpty()) {
            return result;
        }
        for (Edge r : related) {
            result.addAll(relatedEdges(r, edges.stream().filter(e -> !e.equals(edge)).collect(Collectors.toList())));
        }
        return result;
    }

    private List<Node> constructGraph(Places places, Map<List<Place>, Double> weights) {
        List<Node> nodes = places.stream().map(Node::new).collect(Collectors.toList());

        for (int sourceIndex = 0; sourceIndex < places.size(); sourceIndex++) {
            for (int destinationIndex = 0; destinationIndex < places.size(); destinationIndex++) {
                Place sourcePlace = places.get(sourceIndex);
                Place destinationPlace = places.get(destinationIndex);
                Double weight = weights.get(asList(sourcePlace, destinationPlace));
                if (weight != 0) {
                    Node destinationNode = nodes.get(destinationIndex);
                    Node sourceNode = nodes.get(sourceIndex);
                    sourceNode.addDestination(destinationNode, weight.intValue());
                }
            }
        }
        return nodes;
    }

    private List<Node> start(Node currentNode) {

        List<Node> visitedNodes = new ArrayList<>();
        LinkedList<Node> shortestList = new LinkedList<>();
        shortestList.add(currentNode);
        Node nextNearestNode = currentNode;
        while (true) {
            visitedNodes.add(nextNearestNode);
            nextNearestNode = nextNearestAdjacentNode(nextNearestNode, visitedNodes);
            if (nextNearestNode != null) {
                shortestList.add(nextNearestNode);
            } else {
                break;
            }
        }
        return new ArrayList<>(shortestList);

    }

    private Node nextNearestAdjacentNode(Node currentNode, List<Node> visitedNodes) {
        Map<Node, Integer> adjacentNodes = currentNode.getAdjacentNodes();
        List<Node> notVisitedNodes = adjacentNodes.keySet().stream().filter(n -> !visitedNodes.contains(n)).collect(Collectors.toList());
        if (notVisitedNodes.isEmpty()) {
            return null;
        }
        Node nextNearestNode = notVisitedNodes.get(0);
        for (int i = 0; i < notVisitedNodes.size(); i++) {
            if (adjacentNodes.get(nextNearestNode) > adjacentNodes.get(notVisitedNodes.get(i))) {
                nextNearestNode = notVisitedNodes.get(i);
            }
        }
        System.out.printf("Next nearest node for %s is %s%n", currentNode, nextNearestNode);
        return nextNearestNode;
    }

    private Place nextNearestPlace(Place currentPlace, Places unvisitedPlaces, Map<OrderLocation, Double> weightMap) {
        if (unvisitedPlaces.isEmpty()) {
            return null;
        }
        Place nextNearestPlace = unvisitedPlaces.get(0);
        Double nearestPlaceWeight = Double.MAX_VALUE;
        for (Place unvisitedPlace : unvisitedPlaces) {
            OrderLocation orderLocation = new OrderLocation(currentPlace, unvisitedPlace);
            Double weight = weightMap.get(orderLocation);
            if (weight < nearestPlaceWeight) {
                nearestPlaceWeight = weight;
                nextNearestPlace = unvisitedPlace;
            }
        }
        System.out.printf("Next nearest node for %s is %s%n", currentPlace.getAddress(), nextNearestPlace.getAddress());
        return nextNearestPlace;
    }
}

package innovation.hackathon.jan22.maps.providers;

import innovation.hackathon.jan22.api.response.RouteTableResponse;
import innovation.hackathon.jan22.api.response.TripResponse;
import innovation.hackathon.jan22.model.Places;

public interface IRoutingEngine {
    TripResponse getOptimizedRoute(String profile, Places places);

    RouteTableResponse getTableRoute(String profile, Places places);
}

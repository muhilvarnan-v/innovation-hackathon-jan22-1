package innovation.hackathon.jan22.maps.providers;

import com.fasterxml.jackson.databind.ObjectMapper;
import innovation.hackathon.jan22.api.response.RouteTableResponse;
import innovation.hackathon.jan22.api.response.TripResponse;
import innovation.hackathon.jan22.model.Places;
import innovation.hackathon.jan22.utils.Constants;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class OpenStreetMapsEngine implements IRoutingEngine {

    @Override
    public TripResponse getOptimizedRoute(String profile, Places places) {
        String url = String.format("%s/trip/v1/%s/%s?geometries=geojson&steps=true&" +
                        "overview=simplified&annotations=true&roundtrip=false&source=first&destination=last",
                Constants.OSRM_BASE_URL, profile, places.toString());
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            HttpResponse<String> response = HttpClient.newBuilder()
                    .build()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            String responseBody = response.body();
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(responseBody, TripResponse.class);
        } catch (URISyntaxException | IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public RouteTableResponse getTableRoute(String profile, Places places) {
        String url = String.format("%s/table/v1/%s/%s?annotations=duration,distance",
                Constants.OSRM_BASE_URL, profile, places.toString());
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .header("Accept", "application/json")
                    .GET()
                    .build();
            HttpResponse<String> response = HttpClient.newBuilder()
                    .build()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(response.body(), RouteTableResponse.class);
        } catch (URISyntaxException | IOException | InterruptedException e) {
            e.printStackTrace();
        }
        return null;
    }
}

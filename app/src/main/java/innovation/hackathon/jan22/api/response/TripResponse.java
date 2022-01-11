package innovation.hackathon.jan22.api.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import innovation.hackathon.jan22.model.Trip;
import innovation.hackathon.jan22.model.WayPoint;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TripResponse {
    private List<Trip> trips;
    private List<WayPoint> waypoints;
}

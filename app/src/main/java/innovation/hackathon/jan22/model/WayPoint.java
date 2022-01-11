package innovation.hackathon.jan22.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class WayPoint {

    @JsonProperty("waypoint_index")
    private int wayPointIndex;

    @JsonProperty("trips_index")
    private int tripsIndex;

    private String hint;

    private double distance;

    private String name;

    private List<Double> location;
}

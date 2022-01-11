package innovation.hackathon.jan22.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RouteStep {

    @JsonProperty("driving_side")
    private String drivingSide;

    private String name;

    private double distance;

    private double duration;

    private double weight;
}

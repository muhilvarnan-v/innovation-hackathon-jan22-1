package innovation.hackathon.jan22.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import innovation.hackathon.jan22.model.Place;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MultiAgentRouteRequest {
    private List<Place> orderLocations;
    private String criteria;
    @JsonProperty(value = "no_of_agents", defaultValue = "1")
    private int noOfDeliveryAgents;
}

package innovation.hackathon.jan22.api.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import innovation.hackathon.jan22.model.LocationNode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RouteTableResponse {
    private String code;
    private List<List<Double>> durations;
    private List<List<Double>> distances;
    private List<LocationNode> sources;
    private List<LocationNode> destinations;
}

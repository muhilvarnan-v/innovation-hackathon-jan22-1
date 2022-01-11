package innovation.hackathon.jan22.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RouteLeg {

    private List<RouteStep> steps;

    private String summary;

    private double distance;

    private double duration;

    private double weight;
}

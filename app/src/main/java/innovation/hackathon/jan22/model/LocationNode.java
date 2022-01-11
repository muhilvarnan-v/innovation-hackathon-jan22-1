package innovation.hackathon.jan22.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@JsonIgnoreProperties(ignoreUnknown = true)
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LocationNode {
    private String hint;
    private Double distance;
    private List<Double> location;
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LocationNode that = (LocationNode) o;
        return location.equals(that.location) && name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(location, name);
    }
}

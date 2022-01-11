package innovation.hackathon.jan22.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Place {

    private String address;
    private double longitude;
    private double latitude;

    public void setType(String type) {
        this.type = type;
    }

    private String type;

    public Place(String longitude, String latitude) {
        this.longitude = Double.parseDouble(longitude);
        this.latitude = Double.parseDouble(latitude);
    }

    public String longitudeLatitudeString() {
        return longitude + "," + latitude;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Place place = (Place) o;
        return Double.compare(place.longitude, longitude) == 0 && Double.compare(place.latitude, latitude) == 0 && address.equals(place.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(address, longitude, latitude);
    }

    @Override
    public String toString() {
        String s = "Place{" +
                "address='" + address + '\'' +
                ", longitude=" + longitude +
                ", latitude=" + latitude +
                '}';
        if (!StringUtils.isEmpty(type)) {
            s = "Place{" +
                    "address='" + address + '\'' +
                    "type='" + type + '\'' +
                    ", longitude=" + longitude +
                    ", latitude=" + latitude +
                    '}';
        }
        return s;
    }
}

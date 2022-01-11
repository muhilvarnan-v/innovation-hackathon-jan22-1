package innovation.hackathon.jan22.model;

import java.util.ArrayList;
import java.util.List;

public class Places extends ArrayList<Place> {

    public Places(List<Place> places) {
        this.addAll(places);
    }

    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        this.forEach(place -> stringBuilder.append(place.longitudeLatitudeString()).append(";"));
        return stringBuilder.substring(0, stringBuilder.length() - 1);
    }
}

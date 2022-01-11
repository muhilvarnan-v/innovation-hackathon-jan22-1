package innovation.hackathon.jan22.api.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import innovation.hackathon.jan22.model.Place;
import innovation.hackathon.jan22.model.Places;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class MultiDeliveryRouteRequest {
    private List<OrderLocation> orderLocations;
    private String criteria;
    @JsonProperty(value = "delivery_person_location")
    private Place deliveryPersonLocation;

    public Places allPlaces() {
        List<Place> placesForDelivery = new ArrayList<>();
        orderLocations.forEach(orderLocation -> {
            Place pickup = orderLocation.getPickup();
            Place drop = orderLocation.getDrop();

            pickup.setType("Pickup");
            drop.setType("Drop");

            placesForDelivery.add(pickup);
            placesForDelivery.add(drop);
        });
        return new Places(placesForDelivery);
    }

    public Places allPickupPlaces() {
        List<Place> pickupPlaces = new ArrayList<>();
        orderLocations.forEach(orderLocation -> pickupPlaces.add(orderLocation.getPickup()));
        return new Places(pickupPlaces);
    }

    public Place dropPlaceOf(Place pickupPlace) {
        Optional<OrderLocation> optionalOrderLocation = orderLocations.stream()
                .filter(orderLocation -> orderLocation.getPickup().equals(pickupPlace))
                .findFirst();
        return optionalOrderLocation.map(OrderLocation::getDrop).orElse(null);
    }
}

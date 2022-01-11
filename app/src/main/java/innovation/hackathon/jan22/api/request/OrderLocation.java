package innovation.hackathon.jan22.api.request;

import innovation.hackathon.jan22.model.Place;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class OrderLocation {
    private Place pickup;
    private Place drop;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderLocation that = (OrderLocation) o;
        return pickup.equals(that.pickup) && drop.equals(that.drop);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pickup, drop);
    }
}

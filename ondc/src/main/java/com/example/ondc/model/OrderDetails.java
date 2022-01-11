package com.example.ondc.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "order_details")
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String ean;

    Long ordersCount;

    String pincode;

    public OrderDetails(String ean, String pincode, long i) {
        this.ean= ean;
        this.ordersCount = i;
        this.pincode = pincode;
    }
}

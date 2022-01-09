package com.example.ondc.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "ean_data")
public class EanData extends EanDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(unique = true)
    @NotBlank(message = "Ean cannot be blank")
    String ean;

    @NotBlank(message = "Quantity cannot be blank")
    int quantity;

    String category;

    String seasons;

    String shelfLife;

    String mrp;

    String basePrice;

    @Transient
    String sellingPrice;
}

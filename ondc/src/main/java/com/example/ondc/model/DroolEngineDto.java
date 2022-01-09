package com.example.ondc.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.joda.time.LocalDateTime;

import java.math.BigDecimal;
import java.util.Date;
import java.util.TimeZone;

/**
 * Created by GAGAN.HV on 08/01/22
 */
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonIgnoreProperties(ignoreUnknown = true)
@NoArgsConstructor
public class DroolEngineDto {

    BigDecimal basePrice;

    String category;

    String season;

    String expireDateTime;

    @JsonIgnore
    LocalDateTime zonedExpireDateTime;

    String pincode;

    int currentNoOfOrderInPincode;

    int availableInventory;

    TimeZone zone = TimeZone.getTimeZone("IST");

    BigDecimal sellingPrice;

    double perishableWeitage;

    double categoryWeitage;

    double seasonWeitage;

    double inventoryWeitage;

    double orderWeightage;

    double categoryPercentage;

    double seasonPercentage;

    double inventoryPercentage;

    double orderPercentage;

    double perishablePercentage;

    public DroolEngineDto(EanDataResponse eanData, String pincode) {
        this.availableInventory = eanData.getEanData().getQuantity();
        this.basePrice = BigDecimal.valueOf(Double.valueOf(eanData.getEanData().getBasePrice()));
        this.category = eanData.getEanData().getCategory();
        this.pincode = pincode;
        this.zone = TimeZone.getDefault();
//        this.expireDateTime = ZonedDateTime.now();
    }
}

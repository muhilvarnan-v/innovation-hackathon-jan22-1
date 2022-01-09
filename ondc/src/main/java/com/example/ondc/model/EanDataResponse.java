package com.example.ondc.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@Builder
public class EanDataResponse {

    EanData eanData;
    List<OrderDetails> orderDetails;
}

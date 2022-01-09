package com.example.ondc.service;

import com.example.ondc.model.DroolEngineDto;
import com.example.ondc.model.EanDataResponse;
import com.example.ondc.model.OrderDetails;
import com.example.ondc.model.Weightages;
import com.example.ondc.utils.Constants;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CalculateDynamicPriceService {

    @Autowired
    EanDataService eanDataService;

    @Autowired
    OrderService orderService;

    @Autowired
    WeightageService weightageService;

    @Autowired
    DynamicPricingService dynamicPricingService;


    public EanDataResponse calculateDynamicPrice(String eanId, String pincode, String season) {
        EanDataResponse eanDataResponse = eanDataService.getEanData(eanId);
        if (!ObjectUtils.isEmpty(eanDataResponse) && !ObjectUtils.isEmpty(eanDataResponse.getEanData())) {
            List<Weightages> weightages = weightageService.findAllWeightages();
            DroolEngineDto droolEngineDto = getRuleEngineRequest(eanDataResponse, pincode, weightages, season);
            dynamicPricingService.calculateAndSetPrice(droolEngineDto);
            if (droolEngineDto.getSellingPrice().compareTo(BigDecimal.valueOf(Double.parseDouble(eanDataResponse.getEanData().getMrp()))) >= 0) {
                droolEngineDto.setSellingPrice(BigDecimal.valueOf(Double.parseDouble(eanDataResponse.getEanData().getMrp())));
            }
            eanDataResponse.getEanData().setSellingPrice(String.valueOf(droolEngineDto.getSellingPrice()));
        }
        return eanDataResponse;
    }

    private DroolEngineDto getRuleEngineRequest(EanDataResponse eanDataResponse, String pincode, List<Weightages> weightages, String season) {
        DroolEngineDto droolEngineDto = new DroolEngineDto(eanDataResponse, pincode);
        droolEngineDto.setCurrentNoOfOrderInPincode(getNoOfOrderInPincode(eanDataResponse, pincode));
        droolEngineDto.setSeason(getCurrentSeasonForEan(eanDataResponse, pincode, season));
        setWeightages(droolEngineDto, weightages);
        return droolEngineDto;
    }

    private void setWeightages(DroolEngineDto droolEngineDto, List<Weightages> weightages) {
        Map<Constants.Identifier, Double> weightagesMap = weightages.stream().collect(Collectors.toMap(Weightages::getIdentifier, Weightages::getWeightage));
        droolEngineDto.setCategoryWeitage(weightagesMap.getOrDefault(Constants.Identifier.CATEGORY, 0D));
        droolEngineDto.setOrderWeightage(weightagesMap.getOrDefault(Constants.Identifier.ORDER, 0D));
        droolEngineDto.setInventoryWeitage(weightagesMap.getOrDefault(Constants.Identifier.INVENTORY, 0D));
        droolEngineDto.setSeasonWeitage(weightagesMap.getOrDefault(Constants.Identifier.SEASON, 0D));
        droolEngineDto.setPerishableWeitage(weightagesMap.getOrDefault(Constants.Identifier.EXPIRY, 0D));
    }

    private String getCurrentSeasonForEan(EanDataResponse eanDataResponse, String pincode, String season) {
        String[] seasonList = eanDataResponse.getEanData().getSeasons().split(",");
        for (String s : seasonList) {
            if (s.equalsIgnoreCase(season)) {
                return season;
            }
        }
        return null;
    }

    private int getNoOfOrderInPincode(EanDataResponse eanDataResponse, String pincode) {
        return eanDataResponse.getOrderDetails().stream()
                .filter(orderDetails -> pincode.equalsIgnoreCase(orderDetails.getPincode()))
                .findFirst().orElse(new OrderDetails(eanDataResponse.getEanData().getEan(), pincode, 0L)).getOrdersCount().intValue();
    }
}

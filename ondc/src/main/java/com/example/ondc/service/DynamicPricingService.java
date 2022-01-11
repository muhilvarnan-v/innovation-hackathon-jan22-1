package com.example.ondc.service;

import com.example.ondc.model.DroolEngineDto;
import com.example.ondc.utils.KieUtils;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.joda.time.LocalDateTime;
import org.joda.time.format.DateTimeFormat;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.math.BigDecimal;
import java.util.TimeZone;

/**
 * Created by GAGAN.HV on 08/01/22
 */
@Service
@FieldDefaults(level = AccessLevel.PRIVATE)
public class DynamicPricingService {

    public DroolEngineDto calculateAndSetPrice(DroolEngineDto dpdto) {
        if (dpdto.getAvailableInventory() == 0) {
            dpdto.setSellingPrice(dpdto.getBasePrice());
        }
        KieSession kieSession = KieUtils.getKieContainer().newKieSession();
        updateDefaultValue(dpdto);
        kieSession.insert(dpdto);
        kieSession.fireAllRules();
        kieSession.dispose();
        updateSp(dpdto);
        return dpdto;
    }

    private void updateDefaultValue(DroolEngineDto dpdto) {
        if (ObjectUtils.isEmpty(dpdto.getZone())) {
            dpdto.setZone(TimeZone.getDefault());
        }

        if (!ObjectUtils.isEmpty(dpdto.getExpireDateTime())) {
            dpdto.setZonedExpireDateTime(LocalDateTime.parse(dpdto.getExpireDateTime(), DateTimeFormat.forPattern("YYYY-MM-dd HH:mm:SS")));
        }

    }

    private void updateSp(DroolEngineDto droolEngineDto) {
        int cnt = 5;

        if (droolEngineDto.getCategoryPercentage() == 0)
            cnt--;
        if (droolEngineDto.getSeasonPercentage() == 0)
            cnt--;
        if (droolEngineDto.getInventoryPercentage() == 0)
            cnt--;
        if (droolEngineDto.getOrderPercentage() == 0)
            cnt--;
        if (droolEngineDto.getPerishablePercentage() == 0)
            cnt--;

        if (cnt == 0) {
            droolEngineDto.setSellingPrice(droolEngineDto.getBasePrice());

        } else {
            BigDecimal value = BigDecimal.valueOf((droolEngineDto.getCategoryPercentage()
                    + droolEngineDto.getSeasonPercentage()
                    + droolEngineDto.getInventoryPercentage()
                    + droolEngineDto.getOrderPercentage() + droolEngineDto.getPerishablePercentage()) / (cnt * 100));
            droolEngineDto.setSellingPrice(value.multiply(droolEngineDto.getBasePrice()).add(droolEngineDto.getBasePrice()).setScale(2, BigDecimal.ROUND_HALF_EVEN));
        }

    }

}
